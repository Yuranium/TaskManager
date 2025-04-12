package com.yuranium.taskservice.handler;

import com.yuranium.taskservice.entity.ProcessedEventEntity;
import com.yuranium.taskservice.repository.ProcessedRepository;
import com.yuranium.taskservice.sevice.TaskService;
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
public class ProjectDeleteEventHandler
{
    private final TaskService taskService;

    private final ProcessedRepository processedRepository;

    @Transactional
    @KafkaListener(topics = "project-deleted-events-topic", groupId = "project-delete")
    public void deleteProject(@Payload ConsumerRecord<String, Object> projectId,
                              @Header("messageId") String messageId)
    {
        if (processedRepository.findByMessageId(UUID.fromString(messageId)).isPresent())
            return;

        final var project = projectId.value();
        taskService.deleteAllTask((UUID) project);
        processedRepository.save(
                new ProcessedEventEntity(UUID.fromString(messageId),
                        (UUID) project));
    }
}