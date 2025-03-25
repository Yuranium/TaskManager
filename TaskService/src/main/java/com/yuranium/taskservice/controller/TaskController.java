package com.yuranium.taskservice.controller;

import com.yuranium.taskservice.dto.TaskDto;
import com.yuranium.taskservice.dto.TaskInputDto;
import com.yuranium.taskservice.dto.TaskUpdateDto;
import com.yuranium.taskservice.enums.TaskImportance;
import com.yuranium.taskservice.enums.TaskStatus;
import com.yuranium.taskservice.sevice.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController
{
    private final TaskService taskService;

    @GetMapping("/allTasks")
    public ResponseEntity<List<TaskDto>> getAllTasks()
    {
        return new ResponseEntity<>(
                taskService.getAll(), HttpStatus.OK
        );
    }

    @GetMapping("/allTasksByName")
    public ResponseEntity<List<TaskDto>> getAllTasks(
            @RequestParam String name,
            @RequestParam(required = false, defaultValue = "0") int pageNumber,
            @RequestParam(required = false, defaultValue = "15") int size)
    {
        return new ResponseEntity<>(
                taskService.getAllByName(name,
                        PageRequest.of(pageNumber, size)
                ), HttpStatus.OK
        );
    }

    @GetMapping("/allTasksByImportance")
    public ResponseEntity<List<TaskDto>> getAllTasks(
            @RequestParam TaskImportance importance,
            @RequestParam(required = false, defaultValue = "0") int pageNumber,
            @RequestParam(required = false, defaultValue = "15") int size)
    {
        return new ResponseEntity<>(
                taskService.getAllByTaskImportance(importance,
                        PageRequest.of(pageNumber, size)
                ), HttpStatus.OK
        );
    }

    @GetMapping("/allTasksByStatus")
    public ResponseEntity<List<TaskDto>> getAllTasks(
            @RequestParam TaskStatus status,
            @RequestParam(required = false, defaultValue = "0") int pageNumber,
            @RequestParam(required = false, defaultValue = "15") int size)
    {
        return new ResponseEntity<>(
                taskService.getAllByTaskStatus(status,
                        PageRequest.of(pageNumber, size)
                ), HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTask(@PathVariable UUID id)
    {
        return new ResponseEntity<>(
                taskService.getTask(id), HttpStatus.OK
        );
    }

    @PostMapping("/createTask")
    public ResponseEntity<?> createTask(@RequestBody TaskInputDto newTask)
    {
        taskService.createTask(newTask);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTask(@PathVariable UUID id,
                                        @RequestBody TaskUpdateDto updatedDto)
    {
        taskService.updateTask(id, updatedDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> updateTask(@PathVariable UUID id)
    {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}