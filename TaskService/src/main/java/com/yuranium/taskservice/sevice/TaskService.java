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

@Service
@RequiredArgsConstructor
public class TaskService
{
    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    @Transactional(readOnly = true)
    public List<TaskDto> getAll()
    {
        return taskMapper.toDto(
                taskRepository.findAll(PageRequest.of(0, 15))
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
    public TaskDto getTask(Long id)
    {
        return taskMapper.toDto(
                taskRepository.findById(id)
                        .orElseThrow(() -> new TaskEntityNotFoundException(
                                String.format("The task with id=%d was not found!", id)
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
    public void updateTask(Long id, TaskUpdateDto updatedTask)
    {
        if (taskRepository.findById(id).isPresent())
            taskRepository.save(
                    taskMapper.toEntity(updatedTask)
            );
        else throw new TaskEntityNotFoundException(
                String.format("The task with id=%d does not exist", id)
        );
    }

    @Transactional
    public void deleteTask(Long id)
    {
        if (taskRepository.findById(id).isPresent())
            taskRepository.deleteById(id);
        else throw new TaskEntityNotFoundException(
                String.format(
                        "The task with id=%d cannot be removed because it does not exist",
                        id
                )
        );
    }
}