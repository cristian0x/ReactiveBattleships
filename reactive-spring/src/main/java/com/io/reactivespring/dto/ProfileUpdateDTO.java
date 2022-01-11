package com.io.reactivespring.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ProfileUpdateDTO {
    private final Long isWin;
    private final Long numberOfShots;
    private final Long successfulHits;
}
