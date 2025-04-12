package com.yuranium.taskservice.dto;

import com.yuranium.taskservice.enums.TaskStatus;

import java.io.Serializable;
import java.util.UUID;

public record TaskChartDto(

        UUID id,

        String name,

        TaskStatus taskStatus,

        UUID projectId

) implements Serializable {}