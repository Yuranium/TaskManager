package com.yuranium.chatservice.controller;

import com.yuranium.chatservice.models.document.MessageDocument;
import com.yuranium.chatservice.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class WebSocketController
{
    private final MessageService messageService;

    @MessageMapping("/chat.history")
    @SendTo("/topic/history")
    public List<MessageDocument> getAllMessages(Map<String, String> params)
    {
        int pageNumber = Integer.parseInt(params.getOrDefault("pageNumber", "0"));
        int size = Integer.parseInt(params.getOrDefault("size", "100"));

        return messageService.getAllMessages(
                UUID.fromString(params.get("chatId")),
                PageRequest.of(pageNumber, size,
                        Sort.by("dateCreated")));
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public MessageDocument processMessage(@Payload MessageDocument message)
    {
        return messageService.insertMessage(message);
    }

    @MessageMapping("/chat/delete-message")
    public void deleteMessage(UUID messageId, UUID chatId)
    {
        messageService.deleteMessage(messageId, chatId);
    }
}