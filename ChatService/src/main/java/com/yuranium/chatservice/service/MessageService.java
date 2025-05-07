package com.yuranium.chatservice.service;

import com.mongodb.client.result.DeleteResult;
import com.yuranium.chatservice.models.document.MessageDocument;
import com.yuranium.chatservice.models.dto.MessageInputDto;
import com.yuranium.chatservice.util.exception.MessageNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService
{
    private final MongoTemplate mongoTemplate;

    public List<MessageDocument> getAllMessages(UUID chatId, Pageable pageable)
    {
        if (chatId == null)
            throw new IllegalArgumentException(
                    "The chatId is null, cannot load the messages"
            );

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("chatId").is(chatId)),
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "dateCreated")),
                Aggregation.skip(pageable.getOffset()),
                Aggregation.limit(pageable.getPageSize()),
                Aggregation.sort(Sort.by(Sort.Direction.ASC, "dateCreated"))
        );
        return mongoTemplate
                .aggregate(aggregation, MessageDocument.class, MessageDocument.class)
                .getMappedResults();
    }

    public MessageDocument insertMessage(MessageInputDto message)
    {
        return mongoTemplate.insert(MessageDocument.builder()
                .id(UUID.randomUUID())
                .type(message.type())
                .dateCreated(LocalDateTime.now())
                .ownerId(message.ownerId())
                .content(message.content())
                .chatId(message.chatId())
                .build());
    }

    public MessageDocument deleteMessage(UUID messageId)
    {
        MessageDocument message = mongoTemplate.findById(messageId, MessageDocument.class);
        DeleteResult result = mongoTemplate.remove(message);

        if (result.getDeletedCount() == 0)
            throw new MessageNotFoundException(
                String.format("The message with id=%s was not found",
                        messageId)
        );

        return MessageDocument.builder()
                .dateCreated(LocalDateTime.now())
                .content(String.format(
                        "Сообщение '%s' удалено",
                        message.getContent())
                )
                .build();
    }
}