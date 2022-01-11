package com.io.reactivespring.dto;

import com.io.reactivespring.savedgames.SavedGame;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SavedGameDTO {
    private final Long firstPlayerId;
    private final Long secondPlayerId;
    private final String savedMoves;
    private final String savedBy;

    public SavedGame requestToNormalClass() {
        return new SavedGame(this.firstPlayerId, this.secondPlayerId,
                            this.savedMoves, this.savedBy);
    }
}
