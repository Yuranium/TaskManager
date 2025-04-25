package com.yuranium.projectservice.repository;

import com.yuranium.projectservice.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, UUID>
{
    void deleteAllByUserId(Long id);

    List<ProjectEntity> findAllByUserId(Long id);
}