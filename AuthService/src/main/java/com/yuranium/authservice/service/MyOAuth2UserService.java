package com.yuranium.authservice.service;

import com.yuranium.authservice.models.entity.UserEntity;
import com.yuranium.authservice.models.oauth2.OAuth2UserInfo;
import com.yuranium.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MyOAuth2UserService
{
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RoleService roleService;

    @Transactional
    public UserEntity createUser(OAuth2UserInfo userInfo)
    {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userInfo.getUsername());
        userEntity.setName(userInfo.getFirstName());
        userEntity.setLastName(userInfo.getLastName());
        userEntity.setPassword(passwordEncoder.encode(generateRandomPassword()));
        userEntity.setEmail(userInfo.getEmail());
        userEntity.setActivity(true);
        userEntity.setRoles(new HashSet<>(Set.of(roleService.getRole(1))));
        roleService.saveAll(userEntity.getRoles());
        return userRepository.save(userEntity);
    }

    @Transactional(readOnly = true)
    public Optional<UserEntity> getByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }

    /**
     * This method is necessary to generate a random password for the OAuth2 user only
     * */
    private String generateRandomPassword()
    {
        StringBuilder stringBuilder = new StringBuilder();
        int passwordSize = new Random().nextInt(10, 20);

        for (int i = 0; i < passwordSize; i++)
            stringBuilder.append((char) new Random().nextInt(32, 127));

        return stringBuilder.toString();
    }
}