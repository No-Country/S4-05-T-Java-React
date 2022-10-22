package com.proyecto.palomo.controller;

import com.proyecto.palomo.dto.chat.ChatGroupCreated;
import com.proyecto.palomo.dto.chat.ChatResponse;
import com.proyecto.palomo.dto.chat.ChatSimpleCreated;
import com.proyecto.palomo.dto.message.MessageSend;
import com.proyecto.palomo.dto.user.UserRegisterChat;
import com.proyecto.palomo.mapper.MessageMapper;
import com.proyecto.palomo.mapper.UserMapper;
import com.proyecto.palomo.model.Chat;
import com.proyecto.palomo.model.Message;
import com.proyecto.palomo.service.IChatService;
import com.proyecto.palomo.service.IMessageService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {
    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    private SimpMessagingTemplate simpMessagingTemplate;
    private IMessageService messageService;
    private MessageMapper messageMapper;
    private UserMapper userMapper;
    private IChatService chatService;

    /*@MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){

        return message;
    }*/

    @GetMapping("/chat/{id}")
    public ResponseEntity<ChatResponse> get(@PathVariable("id") long id) throws Exception {
        return ResponseEntity.ok(toChatResponse(chatService.get(id)));
    }

    @MessageMapping("/chat/{roomId}/sendMessage")
    public void sendMessage(@DestinationVariable String roomId, @Payload MessageSend messageSend) throws Exception {
        Message message = messageService.create(messageMapper.toMessage(messageSend));
        simpMessagingTemplate.convertAndSend("/chat-room/" + roomId, messageMapper.toResponse(message));
        System.out.println(message.toString());
    }

    @MessageMapping("/chat/{roomId}/addUser")
    public void addUser(@DestinationVariable String roomId, @Payload UserRegisterChat userRegisterChat, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        Long chatId = Long.parseLong(roomId);
        if(!chatService.isExist(Long.parseLong(roomId)))
            return;
        if(!chatService.isExistUserInChat(userRegisterChat.userId(), chatId))
            return;
        headerAccessor.getSessionAttributes().put("user",userRegisterChat);
    }

    @GetMapping("/chat")
    public ResponseEntity<List<ChatResponse>> listAllChats(@RequestParam("userId") Long userId, @RequestParam("page") Integer page) throws Exception {
        return ResponseEntity.ok(chatService.getAllChatsByUserId(userId, page).stream().map(this::toChatResponse).collect(Collectors.toList()));
    }

    @PostMapping("/chat/simple")
    public ResponseEntity<ChatResponse> createSimple(@RequestBody ChatSimpleCreated chatSimpleCreated) throws Exception {
        Chat chat = new Chat();
        chat.setUsers(chatSimpleCreated.users().stream().map(userMapper::toEntity).collect(Collectors.toList()));
        return ResponseEntity.ok(toChatResponse(chatService.createSimple(chat)));
    }

    @PostMapping("/chat/group")
    public ResponseEntity<ChatResponse> createGroup(@RequestBody ChatGroupCreated chatGroupCreated){
        return ResponseEntity.ok(toChatResponse(chatService.createGroup(chatGroupCreated)));
    }

    @PostMapping("/chat/{id}/add-user/{userId}")
    public ResponseEntity<ChatResponse> addUserToChat(@PathVariable("id") long chatId, @PathVariable("userId") long userId) throws Exception {
        return ResponseEntity.ok(toChatResponse(chatService.addUserToChat(userId, chatId)));
    }

    public ChatResponse toChatResponse(Chat chat){
        return new ChatResponse(
                chat.getChatId(),
                chat.getName().substring(1),
                chat.getUsers().stream()
                        .map(user -> new UserRegisterChat(user.getUserId()))
                        .collect(Collectors.toList()),
                chat.getName().startsWith("#")
        );
    }
}