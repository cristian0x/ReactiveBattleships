package com.io.reactivespring.user;

import com.io.reactivespring.exceptions.AuthorizationException;
import com.io.reactivespring.registration.token.ConfirmationToken;
import com.io.reactivespring.registration.token.ConfirmationTokenService;
import com.io.reactivespring.utils.EmailValidator;
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
    private final EmailValidator emailValidator;

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

    public UserDTO login(final LoginRequest request) {
        LOGGER.info("login() user trying to log in");
        if (!emailValidator.test(request.getEmail())) {
            LOGGER.info("login() login - {}, isn't an email", request.getEmail());
            throw new AuthorizationException.InvalidEmailException(request.getEmail());
        }

        LOGGER.debug("login() looking for user with email - {}", request.getEmail());
        final Optional<User> userToCheckPassword = this.userRepository.findByEmail(request.getEmail());

        if (userToCheckPassword.isEmpty()) {
            LOGGER.info("login() there's no user with email - {}", request.getEmail());
            throw new AuthorizationException.UserNotFoundException(request.getEmail());
        }

        final User notVerifiedUser = userToCheckPassword.get();

        if (!passwordEncoder.matches(request.getPassword(), notVerifiedUser.getPassword())) {
            LOGGER.info("login() wrong password for user with email - {}", request.getEmail());
            throw new AuthorizationException.IncorrectPasswordException();
        }

        LOGGER.debug("login() login process passed successfully");
        return userToUserDTO(notVerifiedUser);
    }


    public void enableAppUser(String email) {
        this.userRepository.enableAppUser(email);
    }

    public UserDTO getUserProfile(final Authentication authentication,
                                  final String idOrNickname) {
        LOGGER.info("getUserProfile() getting user with params authentication header - {}, idOrNickname - {}",
                authentication.getName(), idOrNickname);
        if (!Objects.isNull(idOrNickname)) {
            LOGGER.debug("getUserProfile() idOrNickname value is not null");
            try {
                return userToUserDTO(this.userRepository.findById(Long.parseLong(idOrNickname)).orElse(null));
            } catch (NumberFormatException e) {
                return userToUserDTO(this.userRepository.findByNickname(idOrNickname).orElse(null));
            }
        } else {
            LOGGER.debug("getUserProfile() idOrNickname value is null");
            // return userToUserDTO(this.userRepository.findByEmail(authentication.getName()));
            return userToUserDTO(this.userRepository.findByEmail("test@test.pl").orElse(null));
        }
    }

    public List<UserDTO> getAllUsers(final Authentication authentication) {
        final List<User> userList = this.userRepository.findTop100ByOrderByGamesWon();
        return userList.stream()
                .map(UserMapper::userToUserDTO)
                .filter(userDTO -> !Objects.isNull(userDTO))
                .collect(Collectors.toUnmodifiableList());
    }

    public String updateProfile(final Authentication authentication,
                                final ProfileUpdateRequest updateRequest) {
        LOGGER.info("updateProfile() for user with email {}", authentication.getName());
        // this.userRepository.incrementGamesWon(authentication.getName(), updateRequest.getIsWin(), updateRequest.getNumberOfShots(), updateRequest.getSuccessfulHits());
        this.userRepository.updateProfile("test@test.pl", updateRequest.getIsWin(), updateRequest.getNumberOfShots(), updateRequest.getSuccessfulHits());

        return "Profile update successful";
    }

    public String updatePassword(final Authentication authentication,
                                 final String newPassword) {
        LOGGER.info("updatePassword() for user with email {}", authentication.getName());
        final String encodePassword = passwordEncoder.encode(newPassword);
        this.userRepository.updatePassword("test@test.pl", encodePassword);
        // this.userRepository.updatePassword(authentication.getName(), newPassword);

        return "Password update successful";
    }

    public String deleteUser(final Authentication authentication) {
        LOGGER.info("deleteUser() deleting user with email {}", authentication.getName());
        //this.userRepository.deleteAllByEmail(authentication.getName());
        this.userRepository.deleteAllByEmail("test@test.pl");

        return "User deleted successfully";
    }
}
