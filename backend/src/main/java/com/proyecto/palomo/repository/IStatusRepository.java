package com.proyecto.palomo.repository;

import com.proyecto.palomo.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IStatusRepository extends JpaRepository<Status, Long> {
    Optional<Status> findByName(String name);
}
