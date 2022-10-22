package com.proyecto.palomo.repository;

import com.proyecto.palomo.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface IMessageRepository extends PagingAndSortingRepository<Message, Long> {
    public Page<Message> findByChat_ChatIdOrderByTimestampDesc(Long chatId, Pageable pageable);

    public List<Message> findByChat_ChatIdAndTimestampAfterOrderByTimestamp(Long chatId, Date timestamp);
}
