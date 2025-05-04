package com.yuranium.chatservice.controller;

import com.yuranium.chatservice.models.document.ChatDocument;
import com.yuranium.chatservice.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController
{
    private final ChatService chatService;

    @GetMapping("/all-chats")
    public ResponseEntity<List<ChatDocument>> getAllChats(
            @RequestParam Long userId,
            @RequestParam(required = false, defaultValue = "0") int pageNumber,
            @RequestParam(required = false, defaultValue = "50") int size)
    {
        return new ResponseEntity<>(
                chatService.getAllChats(userId,
                PageRequest.of(pageNumber, size)), HttpStatus.OK
        );
    }

    @PostMapping("/create")
    public ResponseEntity<ChatDocument> createChat(
            @RequestParam String title, @RequestParam Long ownerId)
    {
        return new ResponseEntity<>(
                chatService.createChat(title, ownerId),
                HttpStatus.OK
        );
    }
}