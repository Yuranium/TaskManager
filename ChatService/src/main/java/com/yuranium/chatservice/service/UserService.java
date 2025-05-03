package com.yuranium.chatservice.service;

import com.yuranium.chatservice.models.auxiliary.UserFromKafka;
import com.yuranium.chatservice.models.document.UserDocument;
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

    public UserDocument createUser(UserFromKafka user)
    {
        return mongoTemplate.insert(UserDocument.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatar(user.getAvatar())
                .build()
        );
    }

    public List<UserDocument> searchByPrefix(String usernamePrefix)
    {
        String regex = "^" + Pattern.quote(usernamePrefix);
        return mongoTemplate.find(
                Query.query(Criteria.where("username").regex(regex, "i")),
                UserDocument.class
        );
    }

    public void deleteUser(Long id)
    {
        mongoTemplate.remove(
                Query.query(Criteria.where("_id").is(id))
        );
    }
}