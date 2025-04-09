package com.yuranium.taskservice.handler;

import com.yuranium.taskservice.sevice.TaskService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectDeleteEventHandler
{
    private final TaskService taskService;

    @KafkaListener(topics = "project-deleted-events-topic", groupId = "project-delete")
    public void deleteProject(ConsumerRecord<String, Object> projectId)
    {
        taskService.deleteAllTask((UUID) projectId.value());
    }
}