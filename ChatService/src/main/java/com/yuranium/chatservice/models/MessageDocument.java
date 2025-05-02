package com.yuranium.chatservice.models;

import com.yuranium.chatservice.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "messages")
public class MessageDocument
{
    @Id
    private UUID id;

    @Field(name = "message-type")
    private MessageType type;

    @Field(name = "date-created")
    private LocalDateTime dateCreated;

    @Field(name = "owner")
    private UserDocument owner;

    @Field(name = "content")
    private String content;
}