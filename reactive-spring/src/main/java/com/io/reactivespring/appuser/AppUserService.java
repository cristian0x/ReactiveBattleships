package com.io.reactivespring.appuser;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String NICKNAME_NOT_FOUND_MSG = "User with nickname %s not found";

    private final BCryptPasswordEncoder passwordEncoder;
    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return appUserRepository.findByNickname(s)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(NICKNAME_NOT_FOUND_MSG, s)));
    }

    public String singUpUser(AppUser appUser) {
        if (appUserRepository.findByEmail(appUser.getEmail()).isPresent()) {
            throw new IllegalStateException("Email is already used!");
        }

        String encodedPassword = passwordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);

        appUserRepository.save(appUser);

        return "it works";
    }
}
