package com.proyecto.palomo.advice;

import com.proyecto.palomo.exception.ChatSimpleAlreadyExistsException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex) {
        final Map<String, String> body = new LinkedHashMap<>();

        body.put("timestamp", timestamp());
        body.put("message", ex.getMessage());

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        final Map<String, String> body = new LinkedHashMap<>();

        body.put("timestamp", timestamp());
        body.put("message", ex.getMessage());

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(ChatSimpleAlreadyExistsException.class)
    public ResponseEntity<Object> handleChatSimpleAlreadyExistsException(ChatSimpleAlreadyExistsException ex) {
        final Map<String, Object> body = new LinkedHashMap<>();

        body.put("timestamp", timestamp());
        body.put("message", ex.getMessage());
        body.put("chatName", ex.getChatName());
        body.put("chatID", ex.getChatID());

        return ResponseEntity.badRequest().body(body);
    }

    private String timestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm:ss"));
    }

}
