package com.yuranium.chatservice.repository;

import com.yuranium.chatservice.models.ChatDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChatRepository extends MongoRepository<ChatDocument, UUID> {}