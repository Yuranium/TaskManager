package com.yuranium.taskservice.controller;

import com.yuranium.taskservice.dto.TaskDto;
import com.yuranium.taskservice.sevice.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController
{
    private final TaskService taskService;

    @GetMapping("/test")
    public void receiveInfoFromFront(@RequestParam String input)
    {
        System.out.println(input);
    }

    @GetMapping("/allTask")
    public ResponseEntity<List<TaskDto>> getAllTasks()
    {
        return new ResponseEntity<>(
                taskService.getAll(), HttpStatus.OK
        );
    }
}