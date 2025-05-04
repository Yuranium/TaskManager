package com.yuranium.chatservice.handler;

import com.yuranium.chatservice.models.auxiliary.UserCreatedEvent;
import com.yuranium.chatservice.models.document.UserDocument;
import com.yuranium.chatservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class UserEventHandler
{
    private final MongoTemplate mongoTemplate;

    private final UserService userService;

    @Transactional
    @KafkaListener(topics = "user-created-events-topic")
    public void createUserEvent(@Payload ConsumerRecord<String, Object> kafkaUser,
                                @Header("messageId") String messageId)
    {
        final var user = (UserCreatedEvent) kafkaUser.value();

        userService.createUser(user);
    }

    @Transactional
    @KafkaListener(topics = "user-updated-events-topic")
    public void updateUserEvent(@Payload ConsumerRecord<String, Object> kafkaUser,
                                @Header("messageId") String messageId)
    {
        final var user = (UserCreatedEvent) kafkaUser.value();

        UserDocument newUser = UserDocument.builder()
                .id(user.id())
                .username(user.username())
                .binaryData(user.avatarData())
                .build();

        mongoTemplate.save(newUser);
    }

    @Transactional
    @KafkaListener(topics = "user-deleted-events-topic")
    public void deleteUserEvent(@Payload ConsumerRecord<String, Object> userId,
                                @Header("messageId") String messageId)
    {
        final var user = (Long) userId.value();
        mongoTemplate.remove(Query.query(Criteria.where("_id").is(user)));
    }
}