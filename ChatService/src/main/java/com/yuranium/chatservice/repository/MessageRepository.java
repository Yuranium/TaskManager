package com.yuranium.chatservice.repository;

import com.yuranium.chatservice.models.MessageDocument;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends MongoRepository<MessageDocument, UUID>
{
    List<MessageDocument> findByChatId(UUID chatId, Pageable pageable);

    List<MessageDocument> findByOwnerId(Long ownerId, Pageable pageable);
}