package com.yuranium.authservice.service;

import com.yuranium.authservice.dto.UserDto;
import com.yuranium.authservice.dto.UserInfoDto;
import com.yuranium.authservice.dto.UserInputDto;
import com.yuranium.authservice.dto.UserUpdateDto;
import com.yuranium.authservice.entity.UserEntity;
import com.yuranium.authservice.mapper.UserMapper;
import com.yuranium.authservice.repository.UserRepository;
import com.yuranium.authservice.util.UserEntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService
{
    private final UserRepository userRepository;

    private final AvatarService avatarService;

    private final RoleService roleService;

    private final UserMapper userMapper;

    @Transactional(readOnly = true)
    public UserInfoDto getUser(Long id)
    {
        return userMapper.toInfoDto(
                userRepository.findById(id)
                        .orElseThrow(() -> new UserEntityNotFoundException(
                                String.format("The user with id=%s was not found!", id))
                        ));
    }

    @Transactional
    public UserDto createUser(UserInputDto userDto)
    {
        UserEntity userEntity = userMapper.toEntity(userDto);
        userEntity.setRoles(new HashSet<>(Set.of(roleService.getRole(0))));
        userEntity.setAvatars(avatarService.multipartToEntity(userDto.avatars()));

        avatarService.saveAll(userEntity.getAvatars());
        roleService.saveAll(userEntity.getRoles());

        return userMapper.toUserDto(
                userRepository.save(userEntity)
        );
    }

    public void updateUser(UserUpdateDto userDto) // todo корректно обновлять данные из dto в entity
    {
        userRepository.save(
                userMapper.toEntity(userDto)
        );
    }

    @Transactional
    public void deleteUser(Long id)
    {
        if (userRepository.findById(id).isPresent())
        {
            userRepository.deleteById(id);
        }
        else throw new UserEntityNotFoundException(
                String.format(
                        "The user with id=%s cannot be removed because it does not exist",
                        id
                )
        );
    }
}