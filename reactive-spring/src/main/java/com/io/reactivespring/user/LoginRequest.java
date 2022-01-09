package com.io.reactivespring.user;

import lombok.Getter;
import lombok.AllArgsConstructor;

@Getter
@AllArgsConstructor
public class LoginRequest {
    private final String email;
    private final String password;
}
