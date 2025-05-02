package com.yuranium.chatservice.service;

import com.yuranium.chatservice.models.ChatDocument;
import com.yuranium.chatservice.models.UserDocument;
import com.yuranium.chatservice.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService
{
    private final ChatRepository chatRepository;

    public void createChat()
    {
        chatRepository.save(ChatDocument.builder()
                .id(UUID.randomUUID())
                .build());
    }

    public void addUserToChat(UUID chatId, UserDocument userDocument)
    {
        ChatDocument chat = chatRepository.findById(chatId)
                .orElseThrow(NoSuchElementException::new);
        chat.getUsers().add(userDocument);
        chatRepository.save(chat);
    }

    public void deleteUserFromChat(UUID chatId, UserDocument userDocument)
    {

    }
}