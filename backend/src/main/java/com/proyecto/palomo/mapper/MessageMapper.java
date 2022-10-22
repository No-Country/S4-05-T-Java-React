package com.proyecto.palomo.mapper;

import com.proyecto.palomo.dto.message.MessageResponse;
import com.proyecto.palomo.dto.message.MessageSend;
import com.proyecto.palomo.model.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    @Mapping(target = "id",source = "messageId")
    @Mapping(target = "date", source = "timestamp")
    @Mapping(target = "message", source = "message")
    @Mapping(target = "userSenderId", source = "sender.userId")
    MessageResponse toResponse(Message message);

    @Mapping(target = "message", source = "message")
    @Mapping(target = "chat.chatId", source = "chatId")
    @Mapping(target = "sender.userId", source = "userSenderId")
    Message toMessage(MessageSend messagesend);

}
