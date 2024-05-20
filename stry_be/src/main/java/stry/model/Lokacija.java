package stry.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "lokacija")
public class Lokacija {
    @Id
    @Column(name = "id")
    private UUID id; // jedinstveni identifikator lokacije
    @Column(name = "name", unique = true)
    private String name; // naziv lokacije
    @Column(name = "description")
    private String description; // sazeti opis lokacije
    @Column(name = "photo")
    private String photo = "slika"; // path do fotografije lokacije
    @Column(name = "latitude")
    private Double latitude; // geografska širina
    @Column(name = "longitude")
    private Double longitude; // geografska dužina
    @Column(name = "times_collected")
    private int timesCollected = 0; // koliko je puta pokupljena karta kod neke lokacije
    @Transient
    private String reporter; // tko je prijavio lokaciju, ako je player stvara se lokacija za potvrdu

    public Lokacija() {
    }

    public Lokacija(UUID id,
                    String name,
                    String description,
                    String photo,
                    Double latitude,
                    Double longitude,
                    String reporter) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.latitude = latitude;
        this.longitude = longitude;
        this.reporter = reporter;
    }
    public Lokacija(UUID id,
                    String name,
                    String description,
                    String photo,
                    Double latitude,
                    Double longitude) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getPhoto() {
        return photo;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public String getReporter() { return reporter;}

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public int getTimesCollected() {
        return timesCollected;
    }

    public void setTimesCollected(int timesCollected) {
        this.timesCollected = timesCollected;
    }
}