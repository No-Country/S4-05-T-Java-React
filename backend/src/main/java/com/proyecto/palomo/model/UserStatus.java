package com.proyecto.palomo.model;

import com.proyecto.palomo.enums.UserStatusEnum;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "userStatus")
@Data
public class UserStatus {
    @Id
    private Long userStatusId;
    private String name;
    @OneToMany(mappedBy = "userStatus",cascade = CascadeType.ALL)
    private List<User> users;

    public UserStatus(final UserStatusEnum userStatusEnum) {
        this.userStatusId = userStatusEnum.getId();
        this.name = userStatusEnum.getName();
    }
}
