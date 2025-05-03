package com.yuranium.chatservice.repository;

import com.yuranium.chatservice.models.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<UserDocument, Long>
{
    List<UserDocument> findByUsername(String username);
}