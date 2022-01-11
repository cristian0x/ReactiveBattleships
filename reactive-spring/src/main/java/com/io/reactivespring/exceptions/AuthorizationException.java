package com.io.reactivespring.exceptions;

public class AuthorizationException extends RuntimeException {

    public AuthorizationException(final String message) {
        super(message);
    }

    public static class InvalidEmailException extends AuthorizationException {
        public InvalidEmailException(final String email) {
            super(String.format("Email %s is invalid!", email));
        }
    }

    public static class TokenExpiredException extends AuthorizationException {
        public TokenExpiredException(final String token) {
            super(String.format("Token %s already expired!", token));
        }
    }

    public static class TokenNotFoundException extends AuthorizationException {
        public TokenNotFoundException(final String token) {
            super(String.format("Token %s not found!", token));
        }
    }

    public static class TokenAlreadyConfirmedException extends AuthorizationException {
        public TokenAlreadyConfirmedException(final String token) {
            super(String.format("Token %s already confirmed!", token));
        }
    }

    public static class UserNotFoundException extends AuthorizationException {
        public UserNotFoundException(final String email) {
            super(String.format("User for email %s not found!", email));
        }
    }

    public static class InvalidCredentialsException extends AuthorizationException {
        public InvalidCredentialsException(final String email) {
            super(String.format("Logged user is not correct user!", email));
        }
    }

    public static class IncorrectPasswordException extends AuthorizationException {
        public IncorrectPasswordException() {
            super("Incorrect password!");
        }
    }

    public static class EmailValidationException extends AuthorizationException {
        public EmailValidationException() { super("Email for logged user and user that he wants to change password for doesn't match!"); }
    }
}
