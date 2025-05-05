package com.yuranium.chatservice.handler;

import com.yuranium.chatservice.service.UserService;
import com.yuranium.core.events.UserCreatedEvent;
import com.yuranium.core.events.UserUpdatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class UserEventHandler
{
    private final UserService userService;

    @KafkaListener(topics = "user-created-events-topic", groupId = "user-create")
    public void createUserEvent(@Payload UserCreatedEvent userEvent,
                                @Header("messageId") String messageId)
    {
        try {
            log.info("Handling user created event: {}", userEvent);
            userService.createUser(userEvent);
        } catch (Exception e) {
            log.error("Ошибка при обработке UserCreatedEvent: {}", userEvent, e);
            throw e;
        }
    }

    @KafkaListener(topics = "user-updated-events-topic", groupId = "user-update")
    public void updateUserEvent(@Payload UserUpdatedEvent userEvent,
                                @Header("messageId") String messageId)
    {
        userService.updateUser(userEvent);
    }

    @KafkaListener(topics = "user-deleted-events-topic", groupId = "user-delete")
    public void deleteUserEvent(@Payload Long userId,
                                @Header("messageId") String messageId)
    {
        try {
            log.info("Handling user deleted event: {}", userId);
            userService.deleteUser(userId);
        } catch (Exception e) {
            log.error("Ошибка при обработке UserCreatedEvent: {}", userId, e);
            throw e;
        }
    }
}