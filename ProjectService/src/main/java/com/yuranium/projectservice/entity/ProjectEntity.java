package com.yuranium.projectservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "project")
@AllArgsConstructor
@NoArgsConstructor
public class ProjectEntity
{
    @Id
    @Column(name = "id_project", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "date_added", columnDefinition = "TIMESTAMP")
    private LocalDateTime dateAdded;

    @Column(name = "date_updated", columnDefinition = "TIMESTAMP")
    private LocalDateTime dateUpdated;

    @BatchSize(size = 5)
    @OneToMany(mappedBy = "project")
    private List<AvatarEntity> avatars = new ArrayList<>();

    @PrePersist
    private void prePersist()
    {
        this.id = UUID.randomUUID();
        this.dateUpdated = LocalDateTime.now();

        if (this.dateAdded == null)
            this.dateAdded = LocalDateTime.now();
    }

    public void setAvatars(List<AvatarEntity> avatars)
    {
        for (AvatarEntity avatar : avatars)
            avatar.setProject(this);
        this.avatars = avatars;
    }
}