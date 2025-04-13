package com.yuranium.authservice.controller;

import com.yuranium.authservice.models.dto.UserDto;
import com.yuranium.authservice.models.dto.UserInfoDto;
import com.yuranium.authservice.models.dto.UserInputDto;
import com.yuranium.authservice.models.dto.UserLoginDto;
import com.yuranium.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController
{
    private final UserService userService;

    @GetMapping("/user/{id}")
    public ResponseEntity<UserInfoDto> getUser(@PathVariable Long id)
    {
        return new ResponseEntity<>(
                userService.getUser(id),
                HttpStatus.OK
        );
    }

    @GetMapping("/registration")
    public ResponseEntity<UserDto> registerUser(@ModelAttribute UserInputDto userDto)
    {
        return new ResponseEntity<>(
                HttpStatus.CREATED
        );
    }

    @GetMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody UserLoginDto userDto)
    {
        return new ResponseEntity<>(
                HttpStatus.OK
        );
    }
}