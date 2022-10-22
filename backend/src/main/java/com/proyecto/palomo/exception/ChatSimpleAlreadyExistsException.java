package com.proyecto.palomo.exception;

import com.proyecto.palomo.model.Chat;
import lombok.Getter;

@Getter
public class ChatSimpleAlreadyExistsException extends Exception {
    private final String chatName;
    private final long chatID;

    public ChatSimpleAlreadyExistsException(Chat chat) {
        super("Ya existe un chat simple con los usuarios ingresados.");
        this.chatName = chat.getName();
        this.chatID = chat.getChatId();
    }
}
