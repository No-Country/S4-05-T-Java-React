package com.proyecto.palomo.service.impl;


import com.proyecto.palomo.model.Message;
import com.proyecto.palomo.model.Status;
import com.proyecto.palomo.repository.IMessageRepository;
import com.proyecto.palomo.repository.IStatusRepository;
import com.proyecto.palomo.service.IMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService implements IMessageService {

    private final IMessageRepository messageRepository;

    private final IStatusRepository statusRepository;

    @Override
    @Transactional
    public Message create(Message message) throws Exception {
        Message m = new Message();
        m.setMessage(message.getMessage());
        m.setChat(message.getChat());
        m.setTimestamp(new Date());
        m.setSender(message.getSender());

        final var aux = statusRepository.findByName("Enviado")
                .orElseGet(() -> {
                    var status = new Status("Enviado");
                    return statusRepository.save(status);
                });

        m.setStatus(aux);

        System.out.println(m.getMessage() + "\n" + m.getChat().getChatId());

        //1-enviado
        final var newM = messageRepository.save(m);

        System.out.println(newM.getMessage() + "\n" + newM.getMessageId() + "\n" + newM.getSender().getUserId());

        return newM;
    }

    @Override
    public List<Message> getByPage(Integer page, Long chatId) {
        return this.messageRepository.findByChat_ChatIdOrderByTimestampDesc(chatId, PageRequest.of(page,20))
                .stream().collect(Collectors.toList());
    }

    @Override
    public List<Message> getByDateToNext(Date date, Long chatId) {
        return this.messageRepository.findByChat_ChatIdAndTimestampAfterOrderByTimestamp(chatId,date);
    }

    @Override
    public Message get(Long id) throws Exception {
        return this.messageRepository.findById(id).orElseThrow(() -> new Exception("No se encontró al mensaje."));
    }

    @Override
    public void delete(Long id) {
        this.messageRepository.deleteById(id);
    }
}

