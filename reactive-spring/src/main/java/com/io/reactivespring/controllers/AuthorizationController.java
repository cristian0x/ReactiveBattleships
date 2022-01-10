package com.io.reactivespring.controllers;

import com.io.reactivespring.user.LoginRequest;
import com.io.reactivespring.registration.RegistrationRequest;
import com.io.reactivespring.registration.RegistrationService;
import com.io.reactivespring.user.UserDTO;
import com.io.reactivespring.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/auth")
@AllArgsConstructor
public class AuthorizationController {

    private final RegistrationService registrationService;
    private final UserService userService;

    @PostMapping(path="registration")
    public String register(@RequestBody RegistrationRequest request) {
        return this.registrationService.register(request);
    }

    @GetMapping(path="registration/confirm")
    public String confirmEmail(@RequestParam("token") String token) {
        return this.registrationService.confirmToken(token);
    }

    @GetMapping(path="login")
    public UserDTO login(@RequestBody LoginRequest request) {
        return this.registrationService.login(request);
    }

    @GetMapping(path="logout")
    public String logout() {
        SecurityContextHolder.clearContext();
        return "Logout successful";
    }
}
