package com.io.reactivespring.savedgames;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SavedGameRequest {
    private final Long firstPlayerId;
    private final Long secondPlayerId;
    private final String savedMoves;
    private final String savedBy;

    public SavedGame requestToNormalClass() {
        return new SavedGame(this.firstPlayerId, this.secondPlayerId,
                            this.savedMoves, this.savedBy);
    }
}
