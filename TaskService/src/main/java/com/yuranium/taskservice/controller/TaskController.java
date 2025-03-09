package com.yuranium.taskservice.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
public class TaskController
{
    @GetMapping("/test")
    public void receiveInfoFromFront(@RequestParam String input)
    {
        System.out.println(input);
    }
}