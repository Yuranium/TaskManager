package com.yuranium.chatservice.service;

import com.yuranium.chatservice.models.document.UserDocument;
import com.yuranium.core.events.UserCreatedEvent;
import com.yuranium.core.events.UserUpdatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService
{
    private final MongoTemplate mongoTemplate;

    public List<UserDocument> searchByPrefix(String usernamePrefix)
    {
        String regex = "^" + Pattern.quote(usernamePrefix);
        return mongoTemplate.find(
                Query.query(Criteria.where("username").regex(regex, "i")),
                UserDocument.class
        );
    }

    public UserDocument createUser(UserCreatedEvent user)
    {
        return mongoTemplate.insert(UserDocument.builder()
                .id(user.id())
                .username(user.username())
                .binaryData(user.avatarData())
                .build());
    }

    public UserDocument updateUser(UserUpdatedEvent updatedUser)
    {
        UserDocument newUser = UserDocument.builder()
                .id(updatedUser.id())
                .username(updatedUser.username())
                .binaryData(updatedUser.avatarData())
                .build();
        return mongoTemplate.save(newUser);
    }

    public void deleteUser(Long id)
    {
        mongoTemplate.remove(
                Query.query(Criteria.where("_id").is(id)),
                UserDocument.class
        );
    }
}