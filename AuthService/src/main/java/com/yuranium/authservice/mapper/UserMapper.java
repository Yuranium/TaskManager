package com.yuranium.authservice.mapper;

import com.yuranium.authservice.dto.UserDto;
import com.yuranium.authservice.dto.UserInfoDto;
import com.yuranium.authservice.dto.UserInputDto;
import com.yuranium.authservice.dto.UserUpdateDto;
import com.yuranium.authservice.entity.UserEntity;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

import java.util.Set;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {
                RoleMapper.class,
                AvatarMapper.class
        }
)
public interface UserMapper
{
    UserEntity toEntity(UserInfoDto userInfoDto);

    Set<UserEntity> toEntity(Set<UserInfoDto> userInfoDto);

    UserInfoDto toInfoDto(UserEntity userEntity);

    UserUpdateDto toDto(UserEntity userEntity);

    Set<UserInfoDto> toInfoDto(Set<UserEntity> userEntity);

    UserDto toUserDto(UserEntity userEntity);

    UserEntity toEntity(UserInputDto userInputDto);

    UserEntity toEntity(UserUpdateDto userUpdateDto);
}