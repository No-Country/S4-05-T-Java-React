package com.proyecto.palomo.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "status")
@Data
@Builder
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long statusId;
    private String name;
    @OneToMany(mappedBy = "status",cascade = CascadeType.ALL)
    private List<Message> messages;

    public Status(String name) {
        this.name = name;
    }
}
