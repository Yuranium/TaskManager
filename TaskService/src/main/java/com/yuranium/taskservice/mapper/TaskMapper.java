package com.yuranium.taskservice.mapper;

import com.yuranium.taskservice.dto.TaskDto;
import com.yuranium.taskservice.dto.TaskInputDto;
import com.yuranium.taskservice.dto.TaskUpdateDto;
import com.yuranium.taskservice.entity.TaskEntity;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        uses = TaskImageMapper.class
)
public interface TaskMapper
{
    TaskEntity toEntity(TaskDto taskDto);

    List<TaskDto> toDto(List<TaskEntity> taskEntity);

    TaskDto toDto(TaskEntity taskEntity);

    List<TaskEntity> toEntity(List<TaskDto> taskDto);

    TaskEntity toEntity(TaskUpdateDto updatedDto);

    TaskEntity toEntity(TaskInputDto taskInputDto);
}