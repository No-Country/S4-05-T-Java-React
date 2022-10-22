package com.proyecto.palomo.service.impl;

import com.proyecto.palomo.dto.user.*;
import com.proyecto.palomo.enums.UserStatusEnum;
import com.proyecto.palomo.mapper.UserMapper;
import com.proyecto.palomo.model.Role;
import com.proyecto.palomo.model.User;
import com.proyecto.palomo.model.UserStatus;
import com.proyecto.palomo.repository.IRoleRepository;
import com.proyecto.palomo.repository.IUserRepository;
import com.proyecto.palomo.repository.IUserStatusRepository;
import com.proyecto.palomo.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final IUserRepository repository;
    private final IRoleRepository roleRepository;
    private final IUserStatusRepository userStatusRepository;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public UserResponse create(UserRequest request) throws Exception {
        final var user = repository.findByUserNameOrEmail(request.getUsername(), request.getEmail());

        if (user.isPresent()) {
            throw new Exception("El usuario ya se encuentra registrado");
        }

        if (!request.passwordMatches()) {
            throw new Exception("Las contraseñas no coinciden.");
        }

        final var entity = mapper.toEntity(request);
        entity.setPassword(encoder.encode(request.getPassword()));

        final var status = userStatusRepository.findByName(UserStatusEnum.AVAILABLE.getName());
        entity.setUserStatus(status.orElseGet(() -> new UserStatus(UserStatusEnum.AVAILABLE)));

        final var role = roleRepository.findByName("USER");
        entity.addRole(role.orElseGet(() -> new Role("USER")));

        return mapper.toResponse(repository.save(entity));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<UserResponse> get(long id) {
        return repository.findById(id).map(mapper::toResponse);
    }

    @Override
    @Transactional
    public Optional<UserResponse> update(long id, UserUpdate userUpdate) {
        final var user = repository.findById(id);

        if (user.isEmpty()) {
            return Optional.empty();
        }

        user.get().setName(userUpdate.name());
        user.get().setUserName(userUpdate.username());
        user.get().setPicture(userUpdate.picture());
        user.get().setDescription(userUpdate.description());
        user.get().setEmail(userUpdate.email());

        return Optional.of(mapper.toResponse(repository.save(user.get())));
    }

    @Override
    public UserResponse changePassword(long id, UserUpdatePassword password) throws Exception {
        final var user = repository.findById(id)
                .orElseThrow(() -> new Exception("Usuario no encontrado."));

        user.setPassword(encoder.encode(password.password()));

        return mapper.toResponse(repository.save(user));
    }

    @Override
    public boolean delete(long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserResponse> getByUsername(String username) {
        return repository.findByUserName(username).map(mapper::toResponse);
    }

    @Override
    @Transactional
    public ContactResponse addContact(long id, String usernameOrEmail) throws Exception {
        final var contact = repository.findByUserNameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new Exception("El contacto a añadir, no existe."));

        final var user = repository.findById(id)
                .orElseThrow(() -> new Exception("El usuario no existe."));

        final var contactExists = user.getContacts().stream()
                .anyMatch(_contact -> Objects.equals(_contact.getUserId(), contact.getUserId()));

        if (contact.getUserId() == id) {
            throw new Exception("No te puedes añadir a ti mismo como contacto");
        }

        if (contactExists) {
            throw new Exception("El contacto ya está añadido en tu lista de contactos.");
        }

        user.addContact(contact);

        repository.save(user);

        return new ContactResponse("Usuario añadido con éxito!", id, usernameOrEmail);
    }

    @Override
    @Transactional
    public ContactResponse removeContact(long id, String usernameOrEmail) throws Exception {
        final var user = repository.findById(id)
                .orElseThrow(() -> new Exception("El usuario no existe."));

        final var contact = repository.findByUserNameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new Exception("El contacto a remover, no existe."));

        final var existingContact = user.getContacts().stream()
                .anyMatch(c -> Objects.equals(c.getUserId(), contact.getUserId()));

        if (!existingContact) {
            throw new Exception("El contacto que intentas eliminar, no está en tu lista de contactos");
        }

        if (contact.getUserId() == id) {
            throw new Exception("No te puedes remover a ti mismo :D");
        }

        user.removeContact(contact);

        repository.save(user);

        return new ContactResponse("Contacto removido con éxito!", id, usernameOrEmail);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllContacts(long userId) {
        return mapper.toResponses(repository.findById(userId).orElseThrow().getContacts());
    }

    @Override
    @Transactional
    public Optional<UserResponse> updateStatus(long userId, long statusId) throws Exception {
        final var user = repository.findById(userId)
                .orElseThrow(() -> new Exception("No se ha encontrado al usuario"));

        final var statusEnum = Arrays.stream(UserStatusEnum.values())
                .filter(status -> status.getId() == statusId)
                .findFirst()
                .orElseThrow(() -> new Exception("Estado desconocido"));

        final var status = userStatusRepository.findByName(statusEnum.getName())
                .orElseThrow(() -> new Exception("Estado desconocido"));

        user.setUserStatus(status);

        return Optional.of(mapper.toResponse(repository.save(user)));
    }

}
