package com.io.reactivespring.savedgames;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedGamesRepository extends JpaRepository<SavedGame, Long> {
    List<SavedGame> findAllBySavedBy(final String savedBy);
}
