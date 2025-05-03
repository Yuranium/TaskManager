package com.yuranium.chatservice.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "avatars")
public class AvatarDocument
{
    @Id
    private Long id;

    @Field(name = "binaryData", targetType = FieldType.BINARY)
    private byte[] binaryData;

    @Indexed
    @Field(name = "userId", targetType = FieldType.INT64)
    private Long userId;
}