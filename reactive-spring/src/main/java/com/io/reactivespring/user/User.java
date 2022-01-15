package com.io.reactivespring.user;

import com.io.reactivespring.enums.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "registration")
public class User implements UserDetails {

    @Id
    @SequenceGenerator(name="registration_sequence", sequenceName = "registration_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "registration_sequence")
    private Long id;
    private String firstname;
    private String lastname;
    private String nickname;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private Boolean locked;
    private Boolean enabled;
    private Long gamesPlayed;
    private Long gamesWon;
    private Long allShots;
    private Long hits;

    public User(String firstname, String lastname, String nickname, String email, String password, UserRole userRole) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.locked = false;
        this.enabled = false;
        this.gamesPlayed = 0L;
        this.gamesWon = 0L;
        this.allShots = 0L;
        this.hits = 0L;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Override
    public String toString() {
        return "[User={" +
                "firstname=" + this.firstname + ", " +
                "lastname=" + this.lastname + ", " +
                "nickname=" + this.nickname + ", " +
                "email=" + this.email + ", " +
                "}]";
    }
}
