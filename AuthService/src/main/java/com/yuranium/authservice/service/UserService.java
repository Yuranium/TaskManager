package com.yuranium.authservice.service;

import com.yuranium.authservice.mapper.UserMapper;
import com.yuranium.authservice.models.MyUserDetails;
import com.yuranium.authservice.models.dto.UserDto;
import com.yuranium.authservice.models.dto.UserInfoDto;
import com.yuranium.authservice.models.dto.UserInputDto;
import com.yuranium.authservice.models.dto.UserUpdateDto;
import com.yuranium.authservice.models.entity.UserEntity;
import com.yuranium.authservice.repository.UserRepository;
import com.yuranium.authservice.util.exception.UserEntityAlreadyExistsException;
import com.yuranium.authservice.util.exception.UserEntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService
{
    private final UserRepository userRepository;

    private final AvatarService avatarService;

    private final RoleService roleService;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserInfoDto getUser(Long id)
    {
        return userMapper.toInfoDto(
                userRepository.findById(id)
                        .orElseThrow(() -> new UserEntityNotFoundException(
                                String.format("The user with id=%d was not found!", id))
                        ));
    }

    @Transactional
    public UserDto createUser(UserInputDto userDto)
    {
        if (userRepository.findByEmail(userDto.email()).isPresent())
            throw new UserEntityAlreadyExistsException(
                    String.format("The user with email=%s is already exists", userDto.email()
                    ));
        UserEntity userEntity = userMapper.toEntity(userDto);
        userEntity.setRoles(new HashSet<>(Set.of(roleService.getRole(1))));
        userEntity.setAvatars(avatarService.multipartToEntity(userDto.avatars()));
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));

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
                        "The user with id=%d cannot be removed because it does not exist",
                        id
                )
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        return new MyUserDetails(
                userRepository.findByEmail(username)
                        .orElseThrow(
                                () -> new UsernameNotFoundException(
                                        String.format("The user with email=%s was not found!",
                                                username)
                                )
                        )
        );
    }
}