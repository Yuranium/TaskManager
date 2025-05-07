package com.yuranium.chatservice.service;

import com.yuranium.chatservice.enums.MessageType;
import com.yuranium.chatservice.models.document.ChatDocument;
import com.yuranium.chatservice.models.document.MessageDocument;
import com.yuranium.chatservice.models.document.UserDocument;
import lombok.RequiredArgsConstructor;
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
public class ChatServiceImpl implements ChatService
{
    private final MongoTemplate mongoTemplate;

    public ChatDocument createChat(String title, Long ownerId)
    {
        return mongoTemplate.insert(ChatDocument.builder()
                .id(UUID.randomUUID())
                .title(title)
                .ownerId(ownerId)
                .build()
        );
    }

    public List<ChatDocument> getAllChats(Long userId, Pageable pageable)
    {
       return mongoTemplate.find(
               Query.query(Criteria.where("userIds").is(userId))
                       .with(pageable), ChatDocument.class);
    }

    public MessageDocument addUserToChat(UUID chatId, Long userId)
    {
        Query query = Query.query(Criteria.where("_id").is(chatId));
        Update update = new Update().addToSet("userIds", userId);
        mongoTemplate.updateFirst(query, update, ChatDocument.class);

        UserDocument user = mongoTemplate.findById(userId, UserDocument.class);

        return mongoTemplate.save(MessageDocument.builder()
                .id(UUID.randomUUID())
                .type(MessageType.JOIN)
                .dateCreated(LocalDateTime.now())
                .content(String.format(
                        "Пользователь '%s' присоединился к чату!",
                        user.getUsername()
                ))
                .chatId(chatId)
                .build());
    }

    public MessageDocument deleteUserFromChat(UUID chatId, Long userId)
    {
        Query query = Query.query(Criteria.where("_id").is(chatId));
        Update update = new Update().pull("userIds", userId);
        mongoTemplate.updateFirst(query, update, ChatDocument.class);

        UserDocument user = mongoTemplate.findById(userId, UserDocument.class);

        return MessageDocument.builder()
                .id(UUID.randomUUID())
                .type(MessageType.LEAVE)
                .dateCreated(LocalDateTime.now())
                .content(String.format(
                        "Пользователь '%s' покинул чат",
                        user.getUsername()
                ))
                .chatId(chatId)
                .build();
    }

    public MessageDocument deleteChat(UUID chatId, Long ownerId)
    {
        ChatDocument chat = mongoTemplate.findById(chatId, ChatDocument.class);
        if (chat.getOwnerId().longValue() == ownerId.longValue())
            mongoTemplate.remove(chat);
        else throw new UnsupportedOperationException(
                String.format(
                        "The user with id=%d is not a owner of this chat",
                        ownerId
                )
        );

        return MessageDocument.builder()
                .dateCreated(LocalDateTime.now())
                .content(String.format("Чат '%s' был удалён", chat.getTitle()))
                .chatId(chatId)
                .build();
    }
}