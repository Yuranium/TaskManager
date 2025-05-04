package com.yuranium.authservice.config;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@RequiredArgsConstructor
public class KafkaConfig
{
    private final Environment environment;

    @Bean
    public NewTopic userDeleteTopic()
    {
        return new NewTopic(
                environment.getProperty("kafka.topic-names.user-delete"),
                2, (short) 2);
    }

    @Bean
    public NewTopic userCreatedTopic()
    {
        return new NewTopic(
                environment.getProperty("kafka.topic-names.user-create"),
                1, (short) 1
        );
    }

    @Bean
    public NewTopic userUpdatedTopic()
    {
        return new NewTopic(
                environment.getProperty("kafka.topic-names.user-update"),
                1, (short) 1
        );
    }
}