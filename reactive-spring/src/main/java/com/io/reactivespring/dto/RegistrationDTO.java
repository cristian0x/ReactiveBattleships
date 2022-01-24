package com.io.reactivespring.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationDTO {
    private final String firstname;
    private final String lastname;
    private final String nickname;
    @ToString.Exclude private final String password;
    private final String email;
}
