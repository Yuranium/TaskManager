package com.yuranium.taskservice.mapper;

import com.yuranium.taskservice.dto.TaskDto;
import com.yuranium.taskservice.dto.TaskUpdateDto;
import com.yuranium.taskservice.entity.TaskEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskMapper
{
    TaskEntity toEntity(TaskDto taskDto);

    List<TaskDto> toDto(List<TaskEntity> taskEntity);

    TaskDto toDto(TaskEntity taskEntity);

    List<TaskEntity> toEntity(List<TaskDto> taskDto);

    TaskEntity toEntity(TaskUpdateDto updatedDto);
}