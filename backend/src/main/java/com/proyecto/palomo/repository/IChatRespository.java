package com.proyecto.palomo.repository;

import com.proyecto.palomo.model.Chat;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface IChatRespository extends PagingAndSortingRepository<Chat, Long> {

}
