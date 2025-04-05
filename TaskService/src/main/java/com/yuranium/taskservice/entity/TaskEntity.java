package com.yuranium.taskservice.entity;

import com.yuranium.taskservice.enums.TaskImportance;
import com.yuranium.taskservice.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "task")
@AllArgsConstructor
@NoArgsConstructor
public class TaskEntity
{
    @Id
    @Column(name = "id_task")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(name = "name", columnDefinition = "VARCHAR(50)")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "importance")
    private TaskImportance taskImportance;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status")
    private TaskStatus taskStatus;

    @Column(name = "date_added", columnDefinition = "TIMESTAMP")
    private LocalDateTime dateAdded;

    @Column(name = "date_updated", columnDefinition = "TIMESTAMP")
    private LocalDateTime dateUpdated;

    @Column(name = "date_finished", columnDefinition = "DATE")
    private LocalDate dateFinished;

    @Column(name = "finished")
    private Boolean isFinished;

    @BatchSize(size = 5)
    @OneToMany(mappedBy = "task")
    private List<TaskImageEntity> images = new ArrayList<>();

    @Column(name = "id_project")
    private UUID projectId;

    @PrePersist
    private void prePersist()
    {
        this.id = UUID.randomUUID();
        this.dateUpdated = LocalDateTime.now();

        if (this.dateAdded == null)
            this.dateAdded = LocalDateTime.now();
    }
}