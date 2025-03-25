package com.yuranium.projectservice.dto;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

public record ProjectUpdateDto(
        String name,

        String description,

        List<MultipartFile> avatars

) implements Serializable {}