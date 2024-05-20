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
    private String username; // korisnicko ime
    @NonNull
    @Column(name = "password")
    private String password; // lozinka
    @Column(name = "photo")
    private String photo; // fotografija
    @NonNull
    @Column(name = "email", unique = true)
    private String email; // email
    @Column(name = "role")
    private String role; // uloga - player, cartographer ili admin
    @Column(name = "iban")
    private String iban; // iban
    @Column(name = "idPhoto")
    private String idPhoto; // fotografija osobne iskaznice
    @Column(name = "rating")
    private int rating; // rating - broj bodova
    @Column(name = "banned")
    private boolean banned = false; // je li igrač trenutno isključen  iz igre
    @Column(name = "verification_code", length = 64)
    private String verificationCode;
    @Column(name = "enabled")
    private boolean enabled = false;

    public Korisnik() {
    }

    // konstruktor za obicnog igraca
    public Korisnik(String username, String password, String photo, String email) {
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.email = email;
        this.role = "Player";
        this.rating = 1000;
        this.banned = false;
        this.enabled = false;
    }

    // konstruktor za kartografa
    public Korisnik(String username, String password, String photo,
                    String email, String idPhoto, String iban) {
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.email = email;
        this.iban = iban;
        this.idPhoto = idPhoto;
        this.role = "Player"; // nakon sto ga admin potvrdi, role se mijenja u "cartographer"
        this.rating = 1000;
        this.banned = false;
        this.enabled = false;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getPhoto() {
        return photo;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getIban() {
        return iban;
    }

    public String getIdPhoto() {
        return idPhoto;
    }

    public int getRating() {
        return rating;
    }

    public boolean isBanned() {
        return banned;
    }
    public boolean isEnabled() {
        return enabled;
    }

    public void setVerificationCode(String randomCode) {
        this.verificationCode = randomCode;
    }

    public void setEnabled(boolean b) {
        this.enabled = b;
    }

    public String getVerificationCode() {
        return this.verificationCode;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setIdPhoto(String idPhoto) {
        this.idPhoto = idPhoto;
    }
}
