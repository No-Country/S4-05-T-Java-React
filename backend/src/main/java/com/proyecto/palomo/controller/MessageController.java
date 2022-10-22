package com.proyecto.palomo.controller;

import com.proyecto.palomo.dto.message.MessageResponse;
import com.proyecto.palomo.mapper.MessageMapper;
import com.proyecto.palomo.service.impl.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {
    private final MessageService service;
    private final MessageMapper messageMapper;

    @GetMapping("/chat/{chatId}/message")
    public ResponseEntity<List<MessageResponse>> getMessages(@PathVariable("chatId") Long chatId, @RequestParam("page") Integer page){
        List<MessageResponse> messages = service.getByPage(page, chatId).stream()
                .map(messageMapper::toResponse).collect(Collectors.toList());
        return ResponseEntity.ok(messages);
    }

}
