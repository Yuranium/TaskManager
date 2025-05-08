package com.yuranium.chatservice.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yuranium.chatservice.enums.MessageType;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OutputMessage(

        UUID id,

        MessageType type,

        LocalDateTime dateCreated,

        Long ownerId,

        String username,

        byte[] avatarData,

        String content,

        UUID chatId

) implements Serializable {}