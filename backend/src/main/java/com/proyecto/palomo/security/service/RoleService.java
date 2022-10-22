package com.proyecto.palomo.security.service;

import com.proyecto.palomo.model.Role;
import com.proyecto.palomo.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class RoleService {

    @Autowired
    IRoleRepository roleRepository;

    public Optional<Role> getByName(String roleName) {
        return roleRepository.findByName(roleName);
    }

    public void save(Role role) {
        roleRepository.save(role);
    }
}
