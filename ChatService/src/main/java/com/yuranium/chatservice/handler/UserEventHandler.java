package com.yuranium.chatservice.handler;

import com.yuranium.chatservice.service.UserService;
import com.yuranium.core.events.UserCreatedEvent;
import com.yuranium.core.events.UserUpdatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class UserEventHandler
{
    private final UserService userService;

    @Transactional
    @KafkaListener(topics = "user-created-events-topic", groupId = "user-create")
    public void createUserEvent(@Payload UserCreatedEvent userEvent,
                                @Header("messageId") String messageId)
    {
        userService.createUser(userEvent);
    }

    @Transactional
    @KafkaListener(topics = "user-updated-events-topic", groupId = "user-update")
    public void updateUserEvent(@Payload UserUpdatedEvent userEvent,
                                @Header("messageId") String messageId)
    {
        userService.updateUser(userEvent);
    }

    @Transactional
    @KafkaListener(topics = "user-deleted-events-topic", groupId = "user-delete")
    public void deleteUserEvent(@Payload Long userId,
                                @Header("messageId") String messageId)
    {
        userService.deleteUser(userId);
    }
}