package com.yuranium.taskservice.repository;

import com.yuranium.taskservice.entity.ProcessedEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProcessedRepository extends JpaRepository<ProcessedEventEntity, UUID>
{
    Optional<ProcessedEventEntity> findByMessageId(UUID messageId);
}