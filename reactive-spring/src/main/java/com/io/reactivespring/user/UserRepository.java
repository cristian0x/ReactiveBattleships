package com.io.reactivespring.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNickname(String nickname);
    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User a SET a.enabled = TRUE WHERE a.email = ?1")
    void enableAppUser(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User a SET a.gamesWon = a.gamesWon + ?2, a.allShots = a.allShots + ?3, a.gamesPlayed = a.gamesPlayed + 1, a.hits = a.hits + ?4 WHERE a.email = ?1")
    void updateProfile(String email, long isWin, long numberOfShots, long successfulHits);

    @Transactional
    @Modifying
    @Query("UPDATE User a SET a.password = ?2 WHERE a.email = ?1")
    void updatePassword(String s, String newPassword);

    @Transactional
    @Query("DELETE FROM User a WHERE a.email = ?1")
    void deleteAllByEmail(String name);

    List<User> findTop5ByOrderByGamesWon();
}
