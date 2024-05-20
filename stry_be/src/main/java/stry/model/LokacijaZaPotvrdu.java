package stry.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "lokacijaZaPotvrdu")
public class LokacijaZaPotvrdu {
    @Id
    @Column(name = "id")
    private UUID id; // jedinstveni identifikator lokacije za potvrdu
    @Column(name = "name")
    private String name; // naziv lokacije
    @Column(name = "description")
    private String description; // opis lokacije

    @Column(name = "photo")
    private String photo; // fotografija lokacije
    @Column(name = "latitude")
    private Double latitude;
    @Column(name = "longitude")
    private Double longitude; // korisnicko ime kartografa koji ce izvrsiti potvrdu s terena
    @Column(name = "flagged")
    private boolean flagged;

    @Transient
    private boolean approved; // je li

    // ne treba oznaka je li potrebna potvrda s terena jer se nakon potvrde
    // lokacija brise iz ove tablice i premjesta se u tablicu lokacija

    public LokacijaZaPotvrdu() {
    }

    public LokacijaZaPotvrdu(UUID id, String name, String description, String photo, Double latitude, Double longitude) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.latitude = latitude;
        this.longitude = longitude;
        this.flagged = false;
        this.approved = false;
    }

    public LokacijaZaPotvrdu(UUID id, String name, String description, String photo, Double latitude, Double longitude,
                             boolean approved) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.latitude = latitude;
        this.longitude = longitude;
        this.flagged = false;
        this.approved = approved;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public boolean isFlagged() {
        return flagged;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setFlagged(boolean flagged) {
        this.flagged = flagged;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
