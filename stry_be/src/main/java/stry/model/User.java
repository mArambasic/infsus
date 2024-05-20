package stry.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "User")
public class User {
    @Id
    @NonNull
    @Column(name = "username")
    private String username; // korisnicko ime
    @NonNull
    @Column(name = "password")
    private String password; // lozinka
    @NonNull
    @Column(name = "email", unique = true)
    private String email; // email
    @NonNull
    @Column(name = "firstName", unique = true)
    private String firstName; // firstName
    @NonNull
    @Column(name = "lastName", unique = true)
    private String lastName; // lastName
    @Column(name = "role")
    private String role; // uloga - player, cartographer ili admin
    @Column(name = "enabled")
    private boolean enabled = false;

    public User() {
    }

    // konstruktor za user
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = "Player";
        this.enabled = false;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean b) {
        this.enabled = b;
    }

    public void setPassword(String password){
        this.password = password;
    }

}
