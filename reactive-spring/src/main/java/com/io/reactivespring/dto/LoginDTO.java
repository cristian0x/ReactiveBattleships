package com.io.reactivespring.dto;

import lombok.Getter;
import lombok.AllArgsConstructor;

@Getter
@AllArgsConstructor
public class LoginDTO {
    private final String email;
    private final String password;
}
