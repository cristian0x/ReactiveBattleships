package com.io.reactivespring.registration;

import com.io.reactivespring.appuser.AppUser;
import com.io.reactivespring.appuser.AppUserRepository;
import com.io.reactivespring.appuser.AppUserRole;
import com.io.reactivespring.appuser.AppUserService;
import com.io.reactivespring.utils.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final AppUserRepository appUserRepository;

    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        if(!emailValidator.test(request.getEmail())) {
            throw new IllegalStateException("Email is not valid!");
        }
        return appUserService.singUpUser(new AppUser(request.getFirstname(), request.getLastname(),
                                                    request.getEmail(), request.getPassword(), AppUserRole.USER));
    }
}
