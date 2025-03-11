package com.yuranium.taskservice.mapper;

import com.yuranium.taskservice.dto.TaskImageInputDto;
import com.yuranium.taskservice.entity.TaskImageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskImageMapper
{
    TaskImageEntity toEntity(TaskImageInputDto taskImageInputDto);

    List<TaskImageEntity> toEntity(List<TaskImageInputDto> taskImageInputDto);

    TaskImageInputDto toDto(TaskImageEntity taskImageEntity);

    List<TaskImageInputDto> toDto(List<TaskImageEntity> taskImageEntity);
}