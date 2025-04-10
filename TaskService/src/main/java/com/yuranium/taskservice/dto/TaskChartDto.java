package com.yuranium.taskservice.dto;

import java.io.Serializable;
import java.util.UUID;

public record TaskChartDto(

        UUID id,

        String name,

        UUID projectId

) implements Serializable {}