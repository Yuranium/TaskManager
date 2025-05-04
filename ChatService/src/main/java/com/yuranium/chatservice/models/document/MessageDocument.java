package com.yuranium.chatservice.models.document;

import com.yuranium.chatservice.enums.MessageType;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "messages")
public class MessageDocument
{
    @Id
    private UUID id;

    @Field(name = "messageType")
    private MessageType type;

    @Indexed
    @CreatedDate
    @Field(name = "dateCreated", targetType = FieldType.TIMESTAMP)
    private LocalDateTime dateCreated;

    @Indexed
    @Field(name = "ownerId")
    private Long ownerId;

    @Field(name = "content", targetType = FieldType.STRING)
    private String content;

    @Indexed
    @Field(name = "chatId", targetType = FieldType.STRING)
    private UUID chatId;
}