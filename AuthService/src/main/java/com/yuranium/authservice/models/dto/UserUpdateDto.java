package com.yuranium.authservice.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yuranium.authservice.models.entity.UserEntity;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link UserEntity}
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record UserUpdateDto(

        String username,

        String name,

        String lastName,

        String password,

        String email,

        Boolean activity,

        List<AvatarDto> avatars,

        Set<RoleDto> roles

) implements Serializable {}