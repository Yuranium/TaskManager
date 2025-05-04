package com.yuranium.authservice.models.kafka;

import java.io.Serializable;

public record UserCreatedEvent(

        Long id,

        String username,

        byte[] avatarData

) implements Serializable {}