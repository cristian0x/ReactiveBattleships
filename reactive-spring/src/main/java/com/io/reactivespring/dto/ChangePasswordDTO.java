package com.io.reactivespring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChangePasswordDTO {
    private String email;
    private String login;
    private String oldPassword;
    private String newPassword;
}
