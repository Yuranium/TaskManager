package com.yuranium.taskservice.sevice;

import com.yuranium.taskservice.dto.TaskDto;
import com.yuranium.taskservice.dto.TaskInputDto;
import com.yuranium.taskservice.dto.TaskUpdateDto;
import com.yuranium.taskservice.enums.TaskImportance;
import com.yuranium.taskservice.enums.TaskStatus;
import com.yuranium.taskservice.mapper.TaskMapper;
import com.yuranium.taskservice.repository.TaskRepository;
import com.yuranium.taskservice.util.exception.TaskEntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService
{
    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    @Transactional(readOnly = true)
    public List<TaskDto> getAll(UUID projectId)
    {
        return taskMapper.toDto(
                taskRepository.findAllByProjectId(projectId,
                                PageRequest.of(0, 15))
                        .stream()
                        .toList()
        );
    }

    @Transactional(readOnly = true)
    public List<TaskDto> getAllByName(String name, Pageable pageable)
    {
        return taskMapper.toDto(
                taskRepository.findByName(name, pageable)
                        .stream()
                        .toList()
        );
    }

    @Transactional(readOnly = true)
    public List<TaskDto> getAllByTaskImportance(TaskImportance importance, Pageable pageable)
    {
        return taskMapper.toDto(
                taskRepository.findByTaskImportance(importance, pageable)
                        .stream()
                        .toList()
        );
    }

    @Transactional(readOnly = true)
    public List<TaskDto> getAllByTaskStatus(TaskStatus status, Pageable pageable)
    {
        return taskMapper.toDto(
                taskRepository.findByTaskStatus(status, pageable)
                        .stream()
                        .toList()
        );
    }

    @Transactional(readOnly = true)
    public TaskDto getTask(UUID id)
    {
        return taskMapper.toDto(
                taskRepository.findById(id)
                        .orElseThrow(() -> new TaskEntityNotFoundException(
                                String.format("The task with id=%s was not found!", id)
                        ))
        );
    }

    @Transactional
    public void createTask(TaskInputDto newTask)
    {
        taskRepository.save(
                taskMapper.toEntity(newTask)
        );
    }

    @Transactional
    public void updateTask(UUID id, TaskUpdateDto updatedTask)
    {
        if (taskRepository.findById(id).isPresent())
            taskRepository.save(
                    taskMapper.toEntity(updatedTask)
            );
        else throw new TaskEntityNotFoundException(
                String.format("The task with id=%s does not exist", id)
        );
    }

    @Transactional
    public void deleteTask(UUID id)
    {
        if (taskRepository.findById(id).isPresent())
            taskRepository.deleteById(id);
        else throw new TaskEntityNotFoundException(
                String.format(
                        "The task with id=%s cannot be removed because it does not exist",
                        id
                )
        );
    }
}