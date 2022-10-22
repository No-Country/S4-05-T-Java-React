package com.proyecto.palomo.service;

import com.proyecto.palomo.dto.user.*;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    UserResponse create(final UserRequest request) throws Exception;

    Optional<UserResponse> get(final long id);

    Optional<UserResponse> update(final long id, final UserUpdate userUpdate);

    UserResponse changePassword(final long id, final UserUpdatePassword password) throws Exception;

    boolean delete(final long id);

    Optional<UserResponse> getByUsername(String username);
    ContactResponse addContact(long id, String usernameOrEmail) throws Exception;
    ContactResponse removeContact(long id, String usernameOrEmail) throws Exception;

    List<UserResponse> getAllContacts(long userId);
    Optional<UserResponse> updateStatus(long userId, long statusId) throws Exception;
}
