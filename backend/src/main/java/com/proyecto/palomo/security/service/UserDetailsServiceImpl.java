package com.proyecto.palomo.security.service;

import com.proyecto.palomo.model.User;
import com.proyecto.palomo.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    IUserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUserNameOrEmail(userName, userName)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userName));

        return UserDetailsImpl.build(user);
    }
}
