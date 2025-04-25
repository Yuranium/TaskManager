package com.yuranium.authservice.service.kafka;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KafkaProducer
{
    @Value("${kafka.topic-names.user-delete}")
    private String topicName;

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendDeleteUserEvent(Long userId)
    {
        ProducerRecord<String, Object> record =
                new ProducerRecord<>(topicName, userId);

        record.headers().add("messageId", UUID.randomUUID().toString().getBytes());
        kafkaTemplate.send(record);
    }
}