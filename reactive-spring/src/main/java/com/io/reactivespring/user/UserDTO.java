package com.io.reactivespring.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
    private final Long id;
    private final String firstname;
    private final String lastname;
    private final String nickname;
    private final String email;
    private final Long gamesPlayed;
    private final Long gamesWon;
    private final Long allShots;
    private final Long hits;
}
