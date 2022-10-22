package com.proyecto.palomo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long messageId;
    private Date timestamp;
    private String message;
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn (name = "userId", updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn (name = "statusId", updatable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn (name = "chatId", updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Chat chat;

}
