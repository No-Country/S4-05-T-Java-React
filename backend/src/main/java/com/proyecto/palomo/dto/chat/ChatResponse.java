package com.proyecto.palomo.dto.chat;

import com.proyecto.palomo.dto.user.UserRegisterChat;

import java.util.List;

public record ChatResponse(Long id, String name, List<UserRegisterChat> users, Boolean isGroup) {
}
