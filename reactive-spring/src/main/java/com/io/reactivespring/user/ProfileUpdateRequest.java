package com.io.reactivespring.user;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ProfileUpdateRequest {
    private final Long isWin;
    private final Long numberOfShots;
    private final Long successfulHits;
}
