package com.yuranium.taskservice.repository;

import com.yuranium.taskservice.entity.TaskEntity;
import com.yuranium.taskservice.enums.TaskImportance;
import com.yuranium.taskservice.enums.TaskStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long>
{
    List<TaskEntity> findByName(String name, Pageable pageable);

    List<TaskEntity> findByTaskImportance(TaskImportance importance, Pageable pageable);

    List<TaskEntity> findByTaskStatus(TaskStatus status, Pageable pageable);
}