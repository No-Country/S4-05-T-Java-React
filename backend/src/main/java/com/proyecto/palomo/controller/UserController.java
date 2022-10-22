package com.proyecto.palomo.controller;

import com.proyecto.palomo.dto.user.*;
import com.proyecto.palomo.dto.userstatus.UserStatusResponse;
import com.proyecto.palomo.service.IUserService;
import com.proyecto.palomo.service.IUserStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final IUserService service;
    private final IUserStatusService userStatusService;

    @PostMapping
    public ResponseEntity<UserResponse> register(@RequestBody final UserRequest request) throws Exception {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> get(@PathVariable("id") final long id) {
        return ResponseEntity.of(service.get(id));
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserResponse> getByUsername(@PathVariable("username") String username) {
        return ResponseEntity.of(service.getByUsername(username));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable("id") final long id, @RequestBody final UserUpdate userUpdate) {
        return ResponseEntity.of(service.update(id, userUpdate));
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<UserResponse> changePassword(@PathVariable("id") final long id, @RequestBody final UserUpdatePassword password) throws Exception {
        return ResponseEntity.ok(service.changePassword(id, password));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserResponse> delete(@PathVariable("id") final long id) {
        return service.delete(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/add/{contact}")
    public ResponseEntity<ContactResponse> addContact(@PathVariable("id") long id, @PathVariable("contact") String usernameOrEmail) throws Exception {
        return ResponseEntity.ok(service.addContact(id, usernameOrEmail));
    }

    @GetMapping("/{id}/contacts")
    public ResponseEntity<List<UserResponse>> getContacts(@PathVariable("id") long id) {
        return ResponseEntity.ok(service.getAllContacts(id));
    }

    @DeleteMapping("/{id}/remove/{contact}")
    public ResponseEntity<ContactResponse> removeContact(@PathVariable("id") long id, @PathVariable("contact") String usernameOrEmail) throws Exception {
        return ResponseEntity.ok(service.removeContact(id, usernameOrEmail));
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<UserStatusResponse>> getStatuses() {
        return ResponseEntity.ok(userStatusService.getAll());
    }

    @PutMapping("/{id}/status/{statusId}")
    public ResponseEntity<UserResponse> updateStatus(@PathVariable("id") long userId, @PathVariable("statusId") long statusId) throws Exception {
        return ResponseEntity.of(service.updateStatus(userId, statusId));
    }

}
