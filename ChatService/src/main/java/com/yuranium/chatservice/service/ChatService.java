package com.yuranium.chatservice.service;

import com.yuranium.chatservice.models.document.ChatDocument;
import com.yuranium.chatservice.models.document.MessageDocument;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ChatService
{
    ChatDocument createChat(String title, Long ownerId);

    List<ChatDocument> getAllChats(Long userId, Pageable pageable);

    MessageDocument addUserToChat(UUID chatId, Long userId);

    MessageDocument deleteUserFromChat(UUID chatId, Long userId);

    MessageDocument deleteChat(UUID chatId, Long ownerId);
}