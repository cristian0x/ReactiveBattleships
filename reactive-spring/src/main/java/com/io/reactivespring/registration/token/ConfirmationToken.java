package com.io.reactivespring.registration.token;

import com.io.reactivespring.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class ConfirmationToken {

    @Id
    @SequenceGenerator(name="confirmation_token_sequence", sequenceName = "confirmation_token_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "confirmation_token_sequence")
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime created;

    @Column(nullable = false)
    private LocalDateTime expires;

    private LocalDateTime confirmed;

    @ManyToOne
    @JoinColumn(nullable = false, name = "app_user_id")
    private User user;

    public ConfirmationToken(String token,
                             LocalDateTime created,
                             LocalDateTime expires,
                             User user) {
        this.token = token;
        this.created = created;
        this.expires = expires;
        this.user = user;
    }
}
