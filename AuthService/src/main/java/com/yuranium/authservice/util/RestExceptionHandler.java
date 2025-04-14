package com.yuranium.authservice.util;

import com.yuranium.authservice.util.response.RestResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler
{
    @ExceptionHandler(UserEntityNotFoundException.class)
    public ResponseEntity<RestResponse> handleUserEntityNotFoundException(UserEntityNotFoundException exc)
    {
        return new ResponseEntity<>(new RestResponse(
                HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND,
                LocalDateTime.now(), exc.getMessage()
        ), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<RestResponse> handleBadCredentialsException(BadCredentialsException exc)
    {
        return new ResponseEntity<>(new RestResponse(
                HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED,
                LocalDateTime.now(), exc.getMessage()
        ), HttpStatus.UNAUTHORIZED);
    }
}