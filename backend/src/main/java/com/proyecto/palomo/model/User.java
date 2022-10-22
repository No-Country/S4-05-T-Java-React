package com.proyecto.palomo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String name;
    @Column(unique = true, nullable = false)
    private String userName;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = true)
    private String picture;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn (name = "userStatusId")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private UserStatus userStatus;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "userId", nullable = true),
            inverseJoinColumns = @JoinColumn(name="contact", nullable = true)
    )
    private List<User> contacts;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "userChats",
            joinColumns = @JoinColumn(name = "userId", nullable = true),
            inverseJoinColumns = @JoinColumn(name="chatId", nullable = true)
    )
    private List<Chat> chats;


    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "users_roles",
            joinColumns = {@JoinColumn(name = "userId")},
            inverseJoinColumns = {@JoinColumn(name = "roleId")})
    private Set<Role> roles = new HashSet<>();


    public void addContact(User contact){
        if(this.contacts == null){
            this.contacts = new ArrayList<>();
        }

        this.contacts.add(contact);
    }

    public void addChat(Chat chat) {
        if (chats == null) {
            chats = new ArrayList<>();
        }
        chats.add(chat);
        chat.getUsers().add(this);
    }

    public void removeChat(Chat chat) {
        chats.remove(chat);
        chat.getUsers().remove(this);
    }

    public void removeContact(User contact) {
        contacts.remove(contact);
    }

    public User(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    public void addRole(Role role) {
        roles.add(role);
        role.getUsers().add(this);
    }

    public void removeRole(Role role) {
        roles.remove(role);
        role.getUsers().remove(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userId, user.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }

}
