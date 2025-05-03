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
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class ChatController
{
    private final MessageService messageService;

    @SendTo("/topic/last-messages")
    @MessageMapping("/chat/load-messages")
    public List<MessageDocument> getAllMessages(
            @RequestParam(required = false, defaultValue = "0") int pageNumber,
            @RequestParam(required = false, defaultValue = "100") int size,
            @RequestParam UUID chatId
    )
    {
        return messageService.getAllMessages(chatId,
                PageRequest.of(pageNumber, size,
                        Sort.by(Sort.Direction.DESC, "dateCreated")));
    }

    @SendTo("/topic/messages")
    @MessageMapping("/chat")
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