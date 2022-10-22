package com.proyecto.palomo.dto.chat;

import com.proyecto.palomo.dto.user.UserRegisterChat;

import java.util.List;

public record ChatSimpleCreated(List<UserRegisterChat> users) {
}
