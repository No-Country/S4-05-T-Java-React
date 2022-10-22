package com.proyecto.palomo.controller;

import com.proyecto.palomo.dto.auth.AuthRequest;
import com.proyecto.palomo.dto.auth.JwtResponse;
import com.proyecto.palomo.dto.user.UserRequest;
import com.proyecto.palomo.dto.user.UserResponse;
import com.proyecto.palomo.repository.IUserRepository;
import com.proyecto.palomo.security.jwt.JwtUtils;
import com.proyecto.palomo.security.service.UserDetailsImpl;
import com.proyecto.palomo.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

/*
    //  private final AuthenticationManager manager;

 //   @PostMapping("/login")
  //  public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
        try {
         //   final var authentication = manager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsernameOrEmail(), authRequest.getPassword()));
          //  SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok("Sesión iniciada correctamente.");
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
*/

    @Autowired
    IUserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody AuthRequest authRequest) throws Exception {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsernameOrEmail(), authRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        final var userId = userService.getByUsername(userDetails.getUsername())
                .orElseThrow(() -> new Exception("Usuario no encontrado."))
                .id();

        return ResponseEntity.ok(new JwtResponse(
                userId,
                jwt,
                userDetails.getUsername(),
                userDetails.getAuthorities()
        ));

    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRequest userRequest) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(userRequest));
    }
}
