package com.yuranium.chatservice.models;

import com.yuranium.chatservice.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

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

    @Field(name = "messageType")
    private MessageType type;

    @Field(name = "dateCreated", targetType = FieldType.TIMESTAMP)
    private LocalDateTime dateCreated;

    @Indexed
    @Field(name = "owner")
    private Long ownerId;

    @Field(name = "content", targetType = FieldType.STRING)
    private String content;

    @Indexed
    @Field(name = "chatId", targetType = FieldType.STRING)
    private UUID chatId;
}