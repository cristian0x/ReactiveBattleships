package com.io.reactivespring.exceptions;

public class SavedGamesException extends RuntimeException {

    public SavedGamesException(final String message) {
        super(message);
    }

    public static class IncorrectIdsException extends SavedGamesException {
        public IncorrectIdsException() {
            super("Ids are different!");
        }
    }

    public static class IdNotFoundException extends SavedGamesException {
        public IdNotFoundException(final String id) {
            super("Game with id " + id + " not found");
        }
    }
}
