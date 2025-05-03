package com.yuranium.chatservice.service;

import com.yuranium.chatservice.models.MessageDocument;
import com.yuranium.chatservice.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService
{
    private final MessageRepository messageRepository;

    public List<MessageDocument> getAllMessages(UUID chatId, Pageable pageable)
    {
        return messageRepository.findByChatId(chatId, pageable);
    }
}