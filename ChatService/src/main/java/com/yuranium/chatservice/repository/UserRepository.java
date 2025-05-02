package com.yuranium.chatservice.repository;

import com.yuranium.chatservice.models.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserDocument, Long> {}