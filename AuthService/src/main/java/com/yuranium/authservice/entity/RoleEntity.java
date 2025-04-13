package com.yuranium.authservice.entity;

import com.yuranium.authservice.enums.RoleType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "role")
@AllArgsConstructor
@NoArgsConstructor
public class RoleEntity
{
    @Id
    @Column(name = "id_role")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "roles")
    @Enumerated(value = EnumType.STRING)
    private RoleType roles;

    @ManyToMany(mappedBy = "roles")
    private Set<UserEntity> users;
}