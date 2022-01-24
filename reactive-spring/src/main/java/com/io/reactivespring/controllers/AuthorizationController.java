package com.io.reactivespring.controllers;

import com.io.reactivespring.dto.LoginDTO;
import com.io.reactivespring.dto.RegistrationDTO;
import com.io.reactivespring.registration.RegistrationService;
import com.io.reactivespring.dto.UserDTO;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path="/auth")
@AllArgsConstructor
public class AuthorizationController {

    private final RegistrationService registrationService;

    @PostMapping(path="registration")
    public String register(@RequestBody RegistrationDTO request) {
        return this.registrationService.register(request);
    }

    @PostMapping(path="multipleRegistration")
    public String multipleRegistration(@RequestBody List<RegistrationDTO> registrationDTOs) {
        return this.registrationService.multipleRegistration(registrationDTOs);
    }

    @GetMapping(path="registration/confirm")
    public String confirmEmail(@RequestParam("token") String token) {
        return this.registrationService.confirmToken(token);
    }

    @PostMapping(path="login")
    public UserDTO login(@RequestBody LoginDTO request) {
        return this.registrationService.login(request);
    }

    @GetMapping(path="logout")
    public String logout() {
        SecurityContextHolder.clearContext();
        return "Logout successful";
    }
}
