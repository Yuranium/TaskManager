package com.yuranium.chatservice.config;

import com.yuranium.chatservice.enums.ChatAction;
import com.yuranium.chatservice.models.dto.MessageInputDto;
import com.yuranium.chatservice.models.dto.ResponseMessage;
import com.yuranium.chatservice.service.ChatService;
import com.yuranium.chatservice.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.util.EnumMap;
import java.util.function.Function;

@Configuration
@EnableMongoAuditing
@RequiredArgsConstructor
public class ChatConfig
{
    private final MessageService messageService;

    private final ChatService chatService;

    @Bean
    EnumMap<ChatAction, Function<MessageInputDto, ResponseMessage>> chatHandlers()
    {
        EnumMap<ChatAction, Function<MessageInputDto, ResponseMessage>> handlers = new EnumMap<>(ChatAction.class);

        handlers.put(ChatAction.NEW_MESSAGE, messageService::insertMessage);
        handlers.put(ChatAction.DELETE_MESSAGE, message -> messageService.deleteMessage(message.messageId()));
        handlers.put(ChatAction.ADD_USER, message -> chatService.addUserToChat(message.chatId(), message.userId()));
        handlers.put(ChatAction.DELETE_USER, message -> chatService.deleteUserFromChat(message.chatId(), message.userId()));
        handlers.put(ChatAction.DELETE_CHAT, message -> chatService.deleteChat(message.chatId(), message.ownerId()));

        return handlers;
    }
}