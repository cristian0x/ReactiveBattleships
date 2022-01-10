package com.io.reactivespring.controllers;

import com.io.reactivespring.savedgames.SavedGame;
import com.io.reactivespring.savedgames.SavedGameRequest;
import com.io.reactivespring.savedgames.SavedGamesService;
import com.io.reactivespring.user.ProfileUpdateRequest;
import com.io.reactivespring.user.UserDTO;
import com.io.reactivespring.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/user")
@AllArgsConstructor
public class UserController {

    private final SavedGamesService savedGamesService;
    private final UserService userService;

    @GetMapping("savedGames")
    public List<SavedGame> getSavedGames(final Authentication authentication) {
        return this.savedGamesService.getGames(authentication);
    }

    @PostMapping("savedGames/add")
    public String saveNewGame(@RequestBody SavedGameRequest savedGameRequest,
                              final Authentication authentication) {
        return this.savedGamesService.saveGame(savedGameRequest, authentication);
    }

    @GetMapping("savedGames/{id}")
    public SavedGame getSavedGameById(@PathVariable String id,
                                      final Authentication authentication) {
        return this.savedGamesService.getGameById(id, authentication);
    }

    @DeleteMapping("savedGames/{id}")
    public String deleteSavedGameById(@PathVariable String id,
                                      final Authentication authentication) {
        return this.savedGamesService.deleteGameById(id, authentication);
    }

    @GetMapping("profile")
    public UserDTO getProfile(final Authentication authentication) {
        return this.userService.getUserProfile(authentication, null);
    }

    @GetMapping("profile/{idOrNickname}")
    public UserDTO getProfileById(@PathVariable String idOrNickname,
                               final Authentication authentication) {
        return this.userService.getUserProfile(authentication, idOrNickname);
    }

    @GetMapping("leaderboard")
    public List<UserDTO> getLeaderboard(final Authentication authentication) {
        return this.userService.getAllUsers(authentication);
    }

    @GetMapping("updateProfile")
    public String updateProfile(final Authentication authentication,
                                @RequestBody ProfileUpdateRequest updateRequest) {
        return this.userService.updateProfile(authentication, updateRequest);
    }

    @GetMapping("updatePassword")
    public String updatePassword(final Authentication authentication,
                                 @RequestParam String newPassword) {
        return this.userService.updatePassword(authentication, newPassword);
    }

    @DeleteMapping("deleteUser")
    public String deleteUser(final Authentication authentication) {
        return this.userService.deleteUser(authentication);
    }

    @GetMapping("check")
    public String siema(Authentication authentication) {
        return authentication.getName();
    }
}