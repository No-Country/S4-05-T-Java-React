package com.proyecto.palomo.service.impl;

import com.proyecto.palomo.dto.chat.ChatGroupCreated;
import com.proyecto.palomo.exception.ChatSimpleAlreadyExistsException;
import com.proyecto.palomo.model.Chat;
import com.proyecto.palomo.model.User;
import com.proyecto.palomo.repository.IChatRespository;
import com.proyecto.palomo.repository.IUserRepository;
import com.proyecto.palomo.service.IChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService implements IChatService {

    private final IChatRespository chatRepository;
    private final IUserRepository userRepository;

    private static final String CHAT_SIMPLE_FORMAT = "@%s&%s";
    private static final String CHAT_GROUP_FORMAT = "#%s";

    private String formatSimpleNameChat(Long userId, Long secondUserId){
        return String.format(CHAT_SIMPLE_FORMAT, userId, secondUserId);
    }

    private String formatGroupNameChat(String name){
        return String.format(CHAT_GROUP_FORMAT, name);
    }

    @Override
    @Transactional(readOnly = true)
    public Chat get(Long id) throws Exception {
        return chatRepository.findById(id).orElseThrow(() -> new Exception("Chat no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public Chat createSimple(Chat chat) throws Exception {
        Chat nchat = new Chat();
        if(chat.getUsers().size() != 2)
            throw new Exception("Este chat debe tener 2 usuarios.");
        if(chat.getUsers().get(0).getUserId().equals(chat.getUsers().get(1).getUserId()))
            throw new Exception("No puedes agregar dos veces al mismo usuario.");

        User[] users = {chat.getUsers().get(0), chat.getUsers().get(1)};
        User userA = userRepository.findById(users[0].getUserId()).orElseThrow(() -> new Exception("Usuario A no encontrado."));
        User userB = userRepository.findById(users[1].getUserId()).orElseThrow(() -> new Exception("Usuario B no encontrado."));

        final var existingChat = userA.getChats()
                .stream()
                .filter(chatA ->
                        chatA.getName().equals(formatSimpleNameChat(users[0].getUserId(), users[1].getUserId())) ||
                        chatA.getName().equals(formatSimpleNameChat(users[1].getUserId(), users[0].getUserId())))
                .findFirst();

        if (existingChat.isPresent()) {
            throw new ChatSimpleAlreadyExistsException(existingChat.get());
        }

        nchat.setName(formatSimpleNameChat(
                        users[0].getUserId(),
                        users[1].getUserId()));
        nchat = chatRepository.save(nchat);
        userA.addChat(nchat);
        userB.addChat(nchat);
        userRepository.save(userA);
        userRepository.save(userB);

        return nchat;
    }

    @Override
    @Transactional
    public Chat createGroup(ChatGroupCreated chatGroup) {
        final var aux = new Chat();

        aux.setName(formatGroupNameChat(chatGroup.name()));

        final var chat = chatRepository.save(aux);

        for (final var userRegisterChat : chatGroup.users()) {
            final var user = userRepository.findById(userRegisterChat.userId());

            user.ifPresent(_user -> {
                _user.addChat(chat);
                userRepository.save(_user);
            });
        }

        return chatRepository.save(chat);
    }


    @Override
    @Transactional(readOnly = true)
    public Chat getSimpleByUsers(Long userId, Long secondUserId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("Usuario principal no encontrado."));
        User userSecond = userRepository.findById(secondUserId).orElseThrow(() -> new Exception("Usuario secundario no encontrado."));
        User[] users = {user, userSecond};
        return user.getChats()
                .stream()
                .filter(chatA -> (
                        chatA.getName().equals(formatSimpleNameChat(users[0].getUserId(),users[1].getUserId())) ||
                        chatA.getName().equals(formatSimpleNameChat(users[1].getUserId(),users[0].getUserId()))))
                .findAny()
                .orElseThrow(() -> new Exception("Chat no encontrado."));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Chat> getAllChatsByUserId(Long id, Integer page) throws Exception {
        User user = userRepository.findById(id).orElseThrow(() -> new Exception("Usuario no encontrado: #" + id));

        return user.getChats();
    }

    @Override
    @Transactional
    public Chat addUserToChat(Long userId, Long chatId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("Usuario no encontrado."));
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new Exception("Chat no encontrado."));
        String type = chat.getName().toLowerCase().substring(0,1); //prefix @ to simple and # to group

        if(!type.equals("#"))
            throw new Exception("El tipo de chat al que deseas añadir el usuario, no es un grupo.");

        user.addChat(chat);
        userRepository.save(user);

        return chatRepository.save(chat);
    }

    @Override
    public void deleted(Long id) {
        chatRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isExist(Long id) {
        return chatRepository.existsById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isExistUserInChat(Long userId, Long chatId) throws Exception {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new Exception("Chat no encontrado."));
        return chat.getUsers().stream()
                .anyMatch(user -> user.getUserId().equals(userId));
    }
}
