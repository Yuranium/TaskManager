package com.yuranium.projectservice.handler;

import com.yuranium.projectservice.entity.ProcessedEventEntity;
import com.yuranium.projectservice.entity.ProjectEntity;
import com.yuranium.projectservice.repository.ProcessedRepository;
import com.yuranium.projectservice.service.KafkaProducer;
import com.yuranium.projectservice.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserDeleteEventHandler
{
    private final ProjectService projectService;

    private final ProcessedRepository processedRepository;

    private final KafkaProducer kafkaProducer;

    @Transactional
    @KafkaListener(topics = "user-deleted-events-topic", groupId = "user-delete")
    public void deleteProject(@Payload ConsumerRecord<String, Object> userId,
                              @Header("messageId") String messageId)
    {
        if (processedRepository.findByMessageId(UUID.fromString(messageId)).isPresent())
            return;

        final var user = userId.value();
        projectService.deleteAllProject((Long) user);
        kafkaProducer.sendDeleteProjectsEvent(
                projectService.getAllByUserId((Long) user).stream()
                        .map(ProjectEntity::getId)
                        .toList()
        );
        processedRepository.save(
                new ProcessedEventEntity(UUID.fromString(messageId),
                        (Long) user));
    }
}