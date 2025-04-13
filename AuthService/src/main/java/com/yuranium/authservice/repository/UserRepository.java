package com.yuranium.authservice.repository;

import com.yuranium.authservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {}