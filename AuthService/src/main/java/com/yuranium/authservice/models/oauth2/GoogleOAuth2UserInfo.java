package com.yuranium.authservice.models.oauth2;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo
{
    public GoogleOAuth2UserInfo(Map<String, Object> attributes)
    {
        super(attributes);
    }

    @Override
    public String getUsername()
    {
        return (String) attributes.get("name");
    }

    @Override
    public String getFirstName()
    {
        return (String) attributes.get("given_name");
    }

    @Override
    public String getLastName()
    {
        return (String) attributes.get("family_name");
    }

    @Override
    public String getEmail()
    {
        return (String) attributes.get("email");
    }
}