package com.yuranium.taskservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yuranium.taskservice.enums.TaskImportance;
import com.yuranium.taskservice.enums.TaskStatus;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TaskDto(
        String name,

        String description,

        TaskImportance taskImportance,

        TaskStatus taskStatus,

        LocalDateTime dateAdded,

        LocalDate dateFinished,

        Boolean isFinished

) implements Serializable {}