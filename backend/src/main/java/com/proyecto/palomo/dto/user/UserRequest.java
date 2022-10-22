package com.proyecto.palomo.dto.user;

import lombok.Data;

@Data
public class UserRequest {
    private String name, username, email, password, repeatPassword, picture, description;

    public boolean passwordMatches() {
        return !password.isBlank() && !repeatPassword.isBlank() && repeatPassword.equals(password);

    }
}
