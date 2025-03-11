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
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Task")
@AllArgsConstructor
@NoArgsConstructor
public class TaskEntity
{
    @Id
    @Column(name = "id_task")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(name = "date_added", columnDefinition = "DATE")
    private LocalDate dateAdded;

    @Column(name = "date_finished", columnDefinition = "DATE")
    private LocalDate dateFinished;

    @Column(name = "finished")
    private Boolean isFinished;

    @BatchSize(size = 5)
    @OneToMany(mappedBy = "task")
    private List<TaskImageEntity> images;

    @PrePersist
    private void setDateAdded()
    {
        this.dateAdded = LocalDate.now();
    }
}