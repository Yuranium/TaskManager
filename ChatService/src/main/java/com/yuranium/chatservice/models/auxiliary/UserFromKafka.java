package com.yuranium.chatservice.models.auxiliary;

import com.yuranium.chatservice.models.document.AvatarDocument;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserFromKafka
{
    private Long id;

    private String username;

    private AvatarDocument avatar;
}