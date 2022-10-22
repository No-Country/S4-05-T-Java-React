package com.proyecto.palomo.service;

import com.proyecto.palomo.dto.userstatus.UserStatusResponse;

import java.util.List;

public interface IUserStatusService {
    List<UserStatusResponse> getAll();
}
