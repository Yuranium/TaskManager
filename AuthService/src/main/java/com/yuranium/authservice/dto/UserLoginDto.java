package com.yuranium.authservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

/**
 * DTO for {@link com.yuranium.authservice.entity.UserEntity}
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record UserLoginDto(

        String password,

        String email

) implements Serializable {}