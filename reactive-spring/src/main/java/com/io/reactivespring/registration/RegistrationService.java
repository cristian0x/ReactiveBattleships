package com.io.reactivespring.registration;

import com.io.reactivespring.user.*;
import com.io.reactivespring.enums.UserRole;
import com.io.reactivespring.email.EmailSender;
import com.io.reactivespring.exceptions.AuthorizationException;
import com.io.reactivespring.registration.token.ConfirmationToken;
import com.io.reactivespring.registration.token.ConfirmationTokenService;
import com.io.reactivespring.utils.EmailValidator;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.io.reactivespring.utils.UserMapper.userToUserDTO;

@Service
@AllArgsConstructor
public class RegistrationService {

    private static final String EMAIL_LINK = "http://localhost:8080/auth/registration/confirm?token=%s";
    private static final Logger LOGGER = LoggerFactory.getLogger(RegistrationService.class);

    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final EmailValidator emailValidator;

    public String register(final RegistrationRequest request) {
        if(!emailValidator.test(request.getEmail())) {
            throw new AuthorizationException.InvalidEmailException(request.getEmail());
        }
        final String token = userService.singUpUser(new User(request.getFirstname(), request.getLastname(), request.getNickname(),
                request.getEmail(), request.getPassword(), UserRole.USER));
        emailSender.send(request.getEmail(), this.buildEmail(request.getFirstname(), String.format(EMAIL_LINK, token)));

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



    @Transactional
    public String confirmToken(String token) {
        final ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new AuthorizationException.TokenNotFoundException(token));

        if (confirmationToken.getConfirmed() != null) {
            throw new AuthorizationException.TokenAlreadyConfirmedException(token);
        }

        if (confirmationToken.getExpires().isBefore(LocalDateTime.now())) {
            throw new AuthorizationException.TokenExpiredException(token);
        }

        confirmationTokenService.setConfirmed(token);
        userService.enableAppUser(confirmationToken.getUser().getEmail());

        return "Token confirmed";
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
}
