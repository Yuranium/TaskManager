package com.yuranium.taskservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yuranium.taskservice.enums.TaskImportance;
import com.yuranium.taskservice.enums.TaskStatus;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link com.yuranium.taskservice.entity.TaskEntity}
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record TaskInputDto(
        String name,
        String description,
        TaskImportance taskImportance,
        TaskStatus taskStatus,
        LocalDate dateFinished,
        List<TaskImageInputDto> images

) implements Serializable {}