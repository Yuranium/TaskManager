package com.yuranium.chatservice.service;

import com.yuranium.chatservice.enums.MessageType;
import com.yuranium.chatservice.models.document.ChatDocument;
import com.yuranium.chatservice.models.document.MessageDocument;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService
{
    private final MongoTemplate mongoTemplate;

    @Value("${web-chat.user-join-message}")
    private String joinMessage;

    @Value("${web-chat.user-leave-message}")
    private String leaveMessage;

    public List<ChatDocument> getAllChats(Long userId, Pageable pageable)
    {
       return mongoTemplate.find(
               Query.query(Criteria.where("userIds").is(userId))
                       .with(pageable), ChatDocument.class);
    }

    public ChatDocument createChat(String title, Long ownerId)
    {
        return mongoTemplate.insert(ChatDocument.builder()
                .id(UUID.randomUUID())
                .title(title)
                .ownerId(ownerId)
                .build()
        );
    }

    public MessageDocument addUserToChat(UUID chatId, Long userId)
    {
        Query query = Query.query(Criteria.where("_id").is(chatId));
        Update update = new Update().addToSet("userIds", userId);
        mongoTemplate.updateFirst(query, update, ChatDocument.class);

        return MessageDocument.builder()
                .id(UUID.randomUUID())
                .type(MessageType.JOIN)
                .dateCreated(LocalDateTime.now())
                .content(String.format(joinMessage, userId))
                .chatId(chatId)
                .build();
    }

    public MessageDocument deleteUserFromChat(UUID chatId, Long userId)
    {
        Query query = Query.query(Criteria.where("_id").is(chatId));
        Update update = new Update().pull("userIds", userId);
        mongoTemplate.updateFirst(query, update, ChatDocument.class);

        return MessageDocument.builder()
                .id(UUID.randomUUID())
                .type(MessageType.LEAVE)
                .dateCreated(LocalDateTime.now())
                .content(String.format(leaveMessage, userId))
                .chatId(chatId)
                .build();
    }

    public String deleteChat(UUID chatId)
    {
        mongoTemplate.remove(Query.query(
                Criteria.where("_id").is(chatId)),
                ChatDocument.class
        );

        return String.format("Чат с id=%s был удалён", chatId);
    }
}