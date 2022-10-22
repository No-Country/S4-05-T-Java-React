package com.proyecto.palomo.service;

import com.proyecto.palomo.dto.chat.ChatGroupCreated;
import com.proyecto.palomo.model.Chat;

import java.util.List;

public interface IChatService {
    public Chat get(Long id) throws Exception;
    public Chat createSimple(Chat chat) throws Exception;
    public Chat createGroup(ChatGroupCreated chatGroup);
    public Chat getSimpleByUsers(Long userId, Long secondUserId) throws Exception;
    public List<Chat> getAllChatsByUserId(Long id, Integer page) throws Exception;
    public Chat addUserToChat(Long userId, Long chatId) throws Exception;
    public void deleted(Long id);

    public boolean isExist(Long id);
    public boolean isExistUserInChat(Long userId, Long chatId) throws Exception;
}
