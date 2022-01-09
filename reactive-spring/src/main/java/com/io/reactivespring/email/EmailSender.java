package com.io.reactivespring.email;

public interface EmailSender {
    void send(String to, String email);
}
