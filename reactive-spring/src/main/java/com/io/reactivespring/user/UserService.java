package com.io.reactivespring.user;

import com.io.reactivespring.dto.ChangePasswordDTO;
import com.io.reactivespring.dto.ProfileUpdateDTO;
import com.io.reactivespring.dto.UserDTO;
import com.io.reactivespring.exceptions.AuthorizationException;
import com.io.reactivespring.registration.token.ConfirmationToken;
import com.io.reactivespring.registration.token.ConfirmationTokenService;
import com.io.reactivespring.utils.UserMapper;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.io.reactivespring.utils.UserMapper.userToUserDTO;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final static String EMAIL_NOT_FOUND_MSG = "User with email %s not found";
    private final static Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByEmail(s)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(EMAIL_NOT_FOUND_MSG, s)));
    }

    public String singUpUser(User user) {
        LOGGER.info("signUpUser() new user - {}", user);
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException("Email is already used!");
        }

        final String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        LOGGER.debug("signUpUser() saving new user={}", user);
        userRepository.save(user);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(),
                            LocalDateTime.now().plusMinutes(15), user);
        LOGGER.info("signUpUser() generated new confirmationToken={}", confirmationToken);

        this.confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public void enableAppUser(String email) {
        this.userRepository.enableAppUser(email);
    }

    public UserDTO getUserProfile(final Authentication authentication,
                                  final String idOrNickname) {
        LOGGER.info("getUserProfile() getting user with params authentication header - {}, idOrNickname - {}", authentication.getName(), idOrNickname);
        if (!Objects.isNull(idOrNickname)) {
            LOGGER.debug("getUserProfile() idOrNickname value is not null");
            try {
                return userToUserDTO(this.userRepository.findById(Long.parseLong(idOrNickname)).orElse(null));
            } catch (NumberFormatException e) {
                return userToUserDTO(this.userRepository.findByNickname(idOrNickname).orElse(null));
            }
        } else {
            LOGGER.debug("getUserProfile() idOrNickname value is null");
            return userToUserDTO(this.userRepository.findByEmail(authentication.getName()).get());
            // return userToUserDTO(this.userRepository.findByEmail("test@test.pl").orElse(null));
        }
    }

    public List<UserDTO> getAllUsers(final Authentication authentication) {
        final List<User> userList = this.userRepository.findTop5ByOrderByGamesWon();
        return userList.stream()
                .map(UserMapper::userToUserDTO)
                .filter(userDTO -> !Objects.isNull(userDTO))
                .collect(Collectors.toUnmodifiableList());
    }

    public String updateProfile(final Authentication authentication,
                                final ProfileUpdateDTO updateRequest) {
        LOGGER.info("updateProfile() for user with email {}", authentication.getName());
        this.userRepository.updateProfile(authentication.getName(), updateRequest.getIsWin(), updateRequest.getNumberOfShots(), updateRequest.getSuccessfulHits());
        // this.userRepository.updateProfile("test@test.pl", updateRequest.getIsWin(), updateRequest.getNumberOfShots(), updateRequest.getSuccessfulHits());

        return "Profile update successful";
    }

    public String updatePassword(final Authentication authentication,
                                 final ChangePasswordDTO changePasswordDTO) {
        LOGGER.info("updatePassword() for user with email {} with request for email {}", authentication.getName(), authentication.getName());

        if(!Objects.equals(authentication.getName(), changePasswordDTO.getEmail())) {
            LOGGER.warn("updatePassword() user logged in doesn't match the request");
            throw new AuthorizationException.EmailValidationException();
        }

        final Optional<User> optionalUser = this.userRepository.findByEmail(changePasswordDTO.getEmail());

        if(optionalUser.isEmpty()) {
            LOGGER.info("updatePassword() user not found");
            throw new AuthorizationException.UserNotFoundException(changePasswordDTO.getEmail());
        }

        final User user = optionalUser.get();

        if(!Objects.equals(user.getPassword(), changePasswordDTO.getOldPassword())) {
            LOGGER.info("updatePassword() password doesn't match!");
            throw new AuthorizationException.IncorrectPasswordException();
        }

        final String encodePassword = passwordEncoder.encode(changePasswordDTO.getNewPassword());
        // this.userRepository.updatePassword("test@test.pl", encodePassword);
        this.userRepository.updatePassword(authentication.getName(), encodePassword);

        return "Password update successful";
    }

    public String deleteUser(final Authentication authentication) {
        LOGGER.info("deleteUser() deleting user with email {}", authentication.getName());
        this.userRepository.deleteAllByEmail(authentication.getName());
        // this.userRepository.deleteAllByEmail("test@test.pl");

        return "User deleted successfully";
    }
}
