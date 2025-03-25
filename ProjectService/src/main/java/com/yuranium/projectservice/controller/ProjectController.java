package com.yuranium.projectservice.controller;

import com.yuranium.projectservice.dto.ProjectDto;
import com.yuranium.projectservice.dto.ProjectInputDto;
import com.yuranium.projectservice.dto.ProjectUpdateDto;
import com.yuranium.projectservice.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
public class ProjectController
{
    private final ProjectService projectService;

    @GetMapping("/allProjects")
    public ResponseEntity<List<ProjectDto>> getAllProjects(
            @RequestParam(required = false, defaultValue = "0") int pageNumber,
            @RequestParam(required = false, defaultValue = "15") int size)
    {
        return new ResponseEntity<>(
                projectService.getAll(PageRequest.of(pageNumber, size)),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable UUID id)
    {
        return new ResponseEntity<>(
                projectService.getProject(id), HttpStatus.OK
        );
    }

    @PostMapping("/createProject")
    public ResponseEntity<?> createProject(@ModelAttribute ProjectInputDto newProject)
    {
        projectService.createProject(newProject);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProject(@PathVariable UUID id,
                                        @RequestBody ProjectUpdateDto updatedDto)
    {
        projectService.updateProject(id, updatedDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> updateProject(@PathVariable UUID id)
    {
        projectService.deleteProject(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}