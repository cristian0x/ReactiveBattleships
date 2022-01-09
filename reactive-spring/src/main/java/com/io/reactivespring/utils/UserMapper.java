package com.io.reactivespring.utils;

import com.io.reactivespring.user.User;
import com.io.reactivespring.user.UserDTO;

import java.util.Objects;

public class UserMapper {
    public static UserDTO userToUserDTO(final User user) {
        if(Objects.isNull(user)) {
            return null;
        }

        return new UserDTO(user.getId(), user.getFirstname(),
                user.getLastname(), user.getNickname(),
                user.getEmail(), user.getGamesPlayed(),
                user.getGamesWon(), user.getAllShots(),
                user.getHits());
    }
}
