package com.proyecto.palomo.service.impl;

import com.proyecto.palomo.dto.userstatus.UserStatusResponse;
import com.proyecto.palomo.mapper.UserStatusMapper;
import com.proyecto.palomo.repository.IUserStatusRepository;
import com.proyecto.palomo.service.IUserStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserStatusServiceImpl implements IUserStatusService {
    private final IUserStatusRepository repository;
    private final UserStatusMapper mapper;

    @Override
    public List<UserStatusResponse> getAll() {
        return mapper.toResponses(repository.findAll());
    }

}
