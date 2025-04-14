package com.yuranium.authservice.config;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@Configuration
public class JwtConfig
{
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Bean
    public SecretKey secretJwtKey()
    {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
}