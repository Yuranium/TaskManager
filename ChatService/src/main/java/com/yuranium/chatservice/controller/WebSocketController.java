package com.yuranium.chatservice.controller;

import com.yuranium.chatservice.models.document.MessageDocument;
import com.yuranium.chatservice.service.ChatService;
import com.yuranium.chatservice.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class WebSocketController
{
    private final MessageService messageService;

    private final ChatService chatService;

    private final SimpMessagingTemplate template;

    @MessageMapping("/chat/{chatId}/send-message")
    public void processMessage(@DestinationVariable UUID chatId,
                               @Payload MessageDocument message) // todo изменить @SendTo на конкретный путь
    {
        template.convertAndSend(
                String.format("/topic/chats/%s/new-message", chatId),
                messageService.insertMessage(message)
        );
    }

    @MessageMapping("/chat/{chatId}/delete-message")
    public void deleteMessage(@DestinationVariable UUID chatId,
                              @Payload UUID messageId)
    {
        messageService.deleteMessage(messageId);
        template.convertAndSend(
                String.format("/topic/chats/%s/delete-message", chatId),
                "Сообщение удалено" // todo убрать хардкод
        );
    }

    @MessageMapping("/chat/{chatId}/add-user")
    public void addUserToChat(@DestinationVariable UUID chatId,
                                         @Payload Long userId)
    {
        template.convertAndSend(
                String.format("/topic/chats/%s/new-user", chatId),
                chatService.addUserToChat(chatId, userId)
        );
    }

    @MessageMapping("/chat/{chatId}/delete-user")
    public void deleteUserFromChat(@DestinationVariable UUID chatId,
                                   @Payload Long userId)
    {
        template.convertAndSend(
                String.format("/topic/chats/%s/delete-user", chatId),
                chatService.deleteUserFromChat(chatId, userId)
        );
    }

    @MessageMapping("/chat/{chatId}/delete")
    public void deleteChat(@DestinationVariable UUID chatId)
    {
        template.convertAndSend(
                String.format("/topic/chats/%s/delete", chatId),
                chatService.deleteChat(chatId)
        );
    }
}