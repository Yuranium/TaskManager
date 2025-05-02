package com.yuranium.chatservice.models;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chats")
public class ChatDocument
{
    @Id
    private UUID id;

    @CreatedDate
    @Field(name = "date-created")
    private LocalDate dateCreated;

    @Field(name = "users")
    private List<UserDocument> users;

    @Field(name = "messages")
    private List<MessageDocument> messages;
}