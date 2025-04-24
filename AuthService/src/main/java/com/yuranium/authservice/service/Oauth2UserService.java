package com.yuranium.authservice.service;

import com.yuranium.authservice.models.MyUserDetails;
import com.yuranium.authservice.models.entity.UserEntity;
import com.yuranium.authservice.models.oauth2.OAuth2UserInfo;
import com.yuranium.authservice.models.oauth2.OAuth2UserInfoFactory;
import com.yuranium.authservice.repository.UserRepository;
import com.yuranium.authservice.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Oauth2UserService
{
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    @SneakyThrows
    public void oauth2SuccessHandler(
            HttpServletRequest req,
            HttpServletResponse res,
            Authentication authentication)
    {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String registrationId = ((OAuth2AuthenticationToken) authentication)
                .getAuthorizedClientRegistrationId();

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory
                .getOAuth2UserInfo(registrationId, oauthUser.getAttributes());

        UserEntity userEntity = userRepository.findByEmail(userInfo.getEmail())
                .orElse(createUser(userInfo));

        String jwt = jwtUtil.generateToken(new MyUserDetails(userEntity));
        res.sendRedirect("plug" + jwt);
    }

    private UserEntity createUser(OAuth2UserInfo userInfo)
    {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userInfo.getUsername());
        userEntity.setName(userInfo.getFirstName());
        userEntity.setLastName(userInfo.getLastName());
        userEntity.setPassword("OAUTH2_REGISTRATION");
        userEntity.setEmail(userInfo.getEmail());
        userEntity.setActivity(true);
        userEntity.setAvatars(List.of(userInfo.getAvatar()));
        /*return userEntity;*/
        return userRepository.save(userEntity);
    }
}