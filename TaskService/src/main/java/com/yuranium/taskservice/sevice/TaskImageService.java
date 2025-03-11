package com.yuranium.taskservice.sevice;

import com.yuranium.taskservice.repository.TaskImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskImageService
{
    private final TaskImageRepository imageRepository;
}