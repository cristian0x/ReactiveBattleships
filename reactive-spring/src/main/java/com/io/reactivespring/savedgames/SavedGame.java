package com.io.reactivespring.savedgames;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class SavedGame {

    @Id
    @SequenceGenerator(name="saved_games_sequence", sequenceName = "saved_games_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "saved_games_sequence")
    private Long gameId;

    @Column(nullable = false)
    private Long firstPlayerId;

    @Column(nullable = false)
    private Long secondPlayerId;

    @Column(nullable = false)
    private String savedMoves;

    @Column(nullable = false)
    private LocalDateTime played;

    @Column(nullable = false)
    private String savedBy;

    public SavedGame(final Long firstPlayerId,
                     final Long secondPlayerId,
                     final String savedMoves,
                     final String savedBy) {

        this.firstPlayerId = firstPlayerId;
        this.secondPlayerId = secondPlayerId;
        this.savedMoves = savedMoves;
        this.played = LocalDateTime.now();
        this.savedBy = savedBy;
    }

}
