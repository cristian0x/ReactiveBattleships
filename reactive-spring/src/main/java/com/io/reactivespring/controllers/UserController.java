package com.io.reactivespring.controllers;

import com.io.reactivespring.dto.ChangePasswordDTO;
import com.io.reactivespring.savedgames.SavedGame;
import com.io.reactivespring.dto.SavedGameDTO;
import com.io.reactivespring.savedgames.SavedGamesService;
import com.io.reactivespring.dto.ProfileUpdateDTO;
import com.io.reactivespring.dto.UserDTO;
import com.io.reactivespring.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@CrossOrigin("*")
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
    public String saveNewGame(@RequestBody SavedGameDTO savedGameDTO,
                              final Authentication authentication) {
        return this.savedGamesService.saveGame(savedGameDTO, authentication);
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
                                @RequestBody ProfileUpdateDTO updateRequest) {
        return this.userService.updateProfile(authentication, updateRequest);
    }

    @PostMapping("updatePassword")
    public String updatePassword(final Authentication authentication,
                                 @RequestBody ChangePasswordDTO changePasswordDTO) {
        return this.userService.updatePassword(authentication, changePasswordDTO);
    }

    @DeleteMapping("deleteUser")
    public String deleteUser(final Authentication authentication) {
        return this.userService.deleteUser(authentication);
    }
}
