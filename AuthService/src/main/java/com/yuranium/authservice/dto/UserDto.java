package com.yuranium.authservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yuranium.authservice.entity.UserEntity;

import java.io.Serializable;

/**
 * DTO for {@link UserEntity}
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record UserDto(

        Long id,

        String name,

        String email

) implements Serializable {}