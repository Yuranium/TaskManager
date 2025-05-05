package com.yuranium.authservice.service.kafka;

import com.yuranium.authservice.models.entity.AvatarEntity;
import com.yuranium.authservice.models.entity.UserEntity;
import com.yuranium.core.events.UserCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.core.env.Environment;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KafkaProducer
{
    private final Environment environment;

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendDeleteUserEvent(Long userId)
    {
        ProducerRecord<String, Object> record = new ProducerRecord<>(
                environment.getProperty("kafka.topic-names.user-delete"), userId);

        record.headers().add("messageId", UUID.randomUUID().toString().getBytes());
        kafkaTemplate.send(record);
    }

    public void sendCreateUserEvent(UserEntity user)
    {
        ProducerRecord<String, Object> record = new ProducerRecord<>(
                environment.getProperty("kafka.topic-names.user-create"),
                new UserCreatedEvent(user.getId(), user.getUsername(),
                        user.getAvatars().isEmpty() ? null :
                        user.getAvatars().get(0).getBinaryData()));

        record.headers().add("messageId", UUID.randomUUID().toString().getBytes());
        kafkaTemplate.send(record);
    }

    public void sendUpdateUserEvent(UserEntity user)
    {
        List<AvatarEntity> avatars = user.getAvatars();

        ProducerRecord<String, Object> record = new ProducerRecord<>(
                environment.getProperty("kafka.topic-names.user-update"),
                new UserCreatedEvent(user.getId(), user.getUsername(),
                        avatars.isEmpty() ? null : avatars.get(avatars.size() - 1)
                                .getBinaryData()));

        record.headers().add("messageId", UUID.randomUUID().toString().getBytes());
        kafkaTemplate.send(record);
    }
}