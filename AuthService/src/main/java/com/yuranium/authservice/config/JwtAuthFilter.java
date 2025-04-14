package com.yuranium.authservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yuranium.authservice.util.JwtUtil;
import com.yuranium.authservice.util.response.RestResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter
{
    public static final String BEARER_PREFIX = "Bearer ";

    public static final String HEADER_NAME = "Authorization";

    private final JwtUtil jwtUtil;

    private final ObjectMapper objectMapper;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException
    {
        String authHeader = request.getHeader(HEADER_NAME);
        String jwtToken = null, username = null;

        if (authHeader != null && authHeader.startsWith(BEARER_PREFIX))
        {
            jwtToken = authHeader.substring(BEARER_PREFIX.length());
            try {
                username = jwtUtil.getUsername(jwtToken);
            } catch (ExpiredJwtException | SignatureException | MalformedJwtException exc) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType("application/json");
                response.getWriter().write(objectMapper.writeValueAsString(
                        new RestResponse(HttpStatus.UNAUTHORIZED.value(),
                                HttpStatus.UNAUTHORIZED,
                                LocalDateTime.now(),
                                exc.getMessage())
                ));
                return;
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(username, null,
                            jwtUtil.getRoles(jwtToken).stream()
                                    .map(SimpleGrantedAuthority::new)
                                    .toList());

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}