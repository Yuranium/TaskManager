package com.yuranium.authservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yuranium.authservice.entity.AvatarEntity;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link AvatarEntity}
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record AvatarDto(
        Long id,

        String name,

        String contentType,

        byte[] binaryData,

        LocalDate dateAdded

) implements Serializable {}