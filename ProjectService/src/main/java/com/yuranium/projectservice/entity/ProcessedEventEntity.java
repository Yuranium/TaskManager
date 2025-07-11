package com.yuranium.projectservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * <h3>This entity needs to create an idempotent consumer</h3>
 * it is needed to prevent double event handling in case of data read exceptions.
 * */

@Getter
@Setter
@Entity
@Table(name = "processed_event")
@NoArgsConstructor
public class ProcessedEventEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_event", nullable = false)
    private Long id;

    @Column(name = "message_id", nullable = false, unique = true)
    private UUID messageId;

    @Column(name = "user_id")
    private Long userId;

    public ProcessedEventEntity(UUID messageId, Long userId)
    {
        this.messageId = messageId;
        this.userId = userId;
    }
}