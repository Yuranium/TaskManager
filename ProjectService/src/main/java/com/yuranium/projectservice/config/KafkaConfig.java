package com.yuranium.projectservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaConfig
{
    @Bean
    public NewTopic newTopic(
            @Value("${kafka.topic-names.project-delete}")
            String topicName)
    {
        return new NewTopic(topicName, 2, (short) 2);
    }
}