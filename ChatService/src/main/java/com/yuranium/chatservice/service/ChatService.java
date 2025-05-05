package com.yuranium.chatservice.service;

import com.yuranium.chatservice.models.document.ChatDocument;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService
{
    private final MongoTemplate mongoTemplate;

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

    public void addUserToChat(UUID chatId, Long userId)
    {
        Query query = Query.query(Criteria.where("_id").is(chatId));
        Update update = new Update().addToSet("userIds", userId);
        mongoTemplate.updateFirst(query, update, ChatDocument.class);
    }

    public void deleteUserFromChat(UUID chatId, Long userId)
    {
        Query query = Query.query(Criteria.where("_id").is(chatId));
        Update update = new Update().pull("userIds", userId);
        mongoTemplate.updateFirst(query, update, ChatDocument.class);
    }

    public void deleteChat(UUID chatId)
    {
        mongoTemplate.remove(Query.query(
                Criteria.where("_id").is(chatId)),
                ChatDocument.class
        );
    }
}