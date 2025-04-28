package com.yuranium.authservice.service;

import com.yuranium.authservice.models.entity.AvatarEntity;
import com.yuranium.authservice.models.entity.UserEntity;
import com.yuranium.authservice.repository.AvatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvatarService
{
    private final AvatarRepository avatarRepository;

    @Transactional
    public List<AvatarEntity> saveAll(List<AvatarEntity> avatars)
    {
        return avatarRepository.saveAll(avatars);
    }

    @Transactional
    public void updateAvatars(UserEntity userEntity, MultipartFile file)
    {
        userEntity.getAvatars().addAll(
                multipartToEntity(List.of(file)));
        userEntity.setAvatars(userEntity.getAvatars());
        saveAll(new ArrayList<>(userEntity.getAvatars()));
    }

    public List<AvatarEntity> multipartToEntity(List<MultipartFile> file)
    {
        if (file == null)
            return null;
        return file.stream()
                .map(image -> {
                    AvatarEntity avatar = new AvatarEntity();
                    avatar.setName(image.getOriginalFilename());
                    avatar.setContentType(image.getContentType());
                    try {
                        avatar.setBinaryData(image.getBytes());
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    return avatar;
                })
                .collect(Collectors.toList());
    }
}