package com.yuranium.authservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link com.yuranium.authservice.entity.UserEntity}
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