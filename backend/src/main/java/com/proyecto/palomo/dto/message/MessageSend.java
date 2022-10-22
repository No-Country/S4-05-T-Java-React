package com.proyecto.palomo.dto.message;

public record MessageSend(Long id, String message, String date, Long userSenderId, Long chatId) {
}
