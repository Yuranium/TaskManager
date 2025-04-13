package com.yuranium.authservice.repository;

import com.yuranium.authservice.entity.AvatarEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<AvatarEntity, Long> {}