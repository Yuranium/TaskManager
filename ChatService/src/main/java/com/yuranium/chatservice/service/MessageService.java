package com.yuranium.chatservice.service;

import com.yuranium.chatservice.enums.MessageType;
import com.yuranium.chatservice.models.document.MessageDocument;
import com.yuranium.chatservice.util.exception.MessageNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService
{
    private final MongoTemplate mongoTemplate;

    public List<MessageDocument> getAllMessages(UUID chatId, Pageable pageable)
    {
        Query query = Query.query(Criteria.where("chatId").is(chatId))
                .with(pageable);

        return mongoTemplate.find(query, MessageDocument.class);
    }

    public MessageDocument insertMessage(MessageDocument message)
    {
        return mongoTemplate.insert(MessageDocument.builder()
                .id(UUID.randomUUID())
                .type(MessageType.TEXT_MESSAGE)
                .dateCreated(LocalDateTime.now())
                .ownerId(message.getOwnerId())
                .content(message.getContent())
                .chatId(message.getChatId())
                .build());
    }

    public void deleteMessage(UUID messageId, UUID chatId)
    {
        MessageDocument message = mongoTemplate.findById(messageId, MessageDocument.class);

        if (message.getChatId().equals(chatId))
            mongoTemplate.remove(message);
        else throw new MessageNotFoundException(
                String.format("The message with id=%s was not found in chat with chatId=%s",
                        messageId, chatId)
        );
    }
}