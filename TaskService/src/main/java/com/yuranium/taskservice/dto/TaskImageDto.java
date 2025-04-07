package com.yuranium.taskservice.dto;


import java.io.Serializable;
import java.time.LocalDate;

public record TaskImageDto(
        Long id,

        String name,

        String contentType,

        byte[] binaryData,

        LocalDate dateAdded

) implements Serializable {}