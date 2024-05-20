package stry.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Korisnik")
public class Korisnik {
    @Id
    @NonNull
    @Column(name = "username")
    private String username;
    @NonNull
    @Column(name = "password")
    private String password;
    @NonNull
    @Column(name = "email", unique = true)
    private String email;
    @NonNull
    @Column(name = "firstName", unique = true)
    private String firstName;
    @NonNull
    @Column(name = "lastName", unique = true)
    private String lastName;
    @Column(name = "role")
    private String role;

    public Korisnik() {
    }


    public Korisnik(
            @NonNull String username,
            @NonNull String password,
            @NonNull String email,
            @NonNull String firstName,
            @NonNull String lastName,
            String role
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    @NonNull
    public String getUsername() {
        return username;
    }

    public void setUsername(@NonNull String username) {
        this.username = username;
    }

    @NonNull
    public String getPassword() {
        return password;
    }

    public void setPassword(@NonNull String password) {
        this.password = password;
    }

    @NonNull
    public String getEmail() {
        return email;
    }

    public void setEmail(@NonNull String email) {
        this.email = email;
    }

    @NonNull
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(@NonNull String firstName) {
        this.firstName = firstName;
    }

    @NonNull
    public String getLastName() {
        return lastName;
    }

    public void setLastName(@NonNull String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
