package com.yuranium.chatservice.models.auxiliary;

import java.io.Serializable;

public record UserCreatedEvent(

        Long id,

        String username,

        byte[] avatarData

) implements Serializable {}