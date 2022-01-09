package com.io.reactivespring.savedgames;

import com.io.reactivespring.user.User;
import com.io.reactivespring.user.UserRepository;
import com.io.reactivespring.exceptions.AuthorizationException;
import com.io.reactivespring.exceptions.SavedGamesException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class SavedGamesService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SavedGamesService.class);

    private final SavedGamesRepository savedGamesRepository;
    private final UserRepository userRepository;

    public String saveGame(final SavedGameRequest savedGameRequest,
                           final Authentication authentication) {

//        if (!authentication.getName().equals(savedGameRequest.getSavedBy())) {
        if (!savedGameRequest.getSavedBy().equals("test@test.pl")) {
            LOGGER.warn("saveGame() logged user is different than one that saves this game {}", authentication.getName());
            throw new SavedGamesException.IncorrectIdsException();
        }

        this.savedGamesRepository.save(new SavedGame(savedGameRequest.getFirstPlayerId(), savedGameRequest.getSecondPlayerId(),
                                                        savedGameRequest.getSavedMoves(), savedGameRequest.getSavedBy()));

        LOGGER.info("saveGame() Game saved successfully");
        return "Saving game successful";
    }

    public List<SavedGame> getGames(final Authentication authentication) {
        //return this.savedGamesRepository.findAllBySavedByPlayerId(authentication.getName());
        return this.savedGamesRepository.findAllBySavedBy("test@test.pl");
    }

    public SavedGame getGameById(final String id,
                                 final Authentication authentication) {
        try {
            LOGGER.debug("getGameById() looking for a game with id {}", id);
            final SavedGame foundGame = this.savedGamesRepository.findById(Long.parseLong(id)).isPresent()
                                        ? this.savedGamesRepository.findById(Long.parseLong(id)).get()
                                        : null;

            //if (!Objects.isNull(foundGame) && Objects.equals(foundGame.getSavedBy(), authentication.getName())) {
            if (!Objects.isNull(foundGame) && Objects.equals(foundGame.getSavedBy(), "test@test.pl")) {
                LOGGER.debug("getGameById() game for id {} found successfully", id);
                return foundGame;
            }

            LOGGER.warn("getGameById() Game not found or logged user does not match");
            throw new SavedGamesException.IdNotFoundException(id);
        } catch (NumberFormatException e) {
            LOGGER.warn("getGameById() id is in incorrect format", e);
            return null;
        }
    }

    public String deleteGameById(final String id,
                                 final Authentication authentication) {

        final User authUser = this.userRepository.findByEmail("test@test.pl").isPresent()
                                    ? this.userRepository.findByEmail("test@test.pl").get()
                                    : null;

//        final AppUser authUser = this.appUserRepository.findByEmail(authentication.getName()).isPresent()
//                                    ? this.appUserRepository.findByEmail(authentication.getName()).get()
//                                    : null;

        if (Objects.isNull(authUser)) {
            LOGGER.warn("deleteByGameId() authUser for email {} not found", authentication.getName());
            throw new AuthorizationException.UserNotFoundException(authentication.getName());
        }

        try {
            LOGGER.debug("deleteGameById() looking for a game with id {}", id);
            final SavedGame foundGame = this.savedGamesRepository.findById(Long.parseLong(id)).isPresent()
                                            ? this.savedGamesRepository.findById(Long.parseLong(id)).get()
                                            : null;

            if (Objects.isNull(foundGame)) {
                LOGGER.warn("Game with id {} not found", id);
                throw new SavedGamesException.IdNotFoundException(id);
            }

            this.savedGamesRepository.deleteById(Long.parseLong(id));
            return "Game deleted successfully!";
        } catch (NumberFormatException e) {
            LOGGER.warn("deleteGameById() id is in incorrect format", e);
            return "Problem occurred in deleting saved game";
        }
    }
}
