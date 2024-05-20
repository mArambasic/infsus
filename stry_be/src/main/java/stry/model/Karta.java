package stry.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "karta")
public class Karta {
    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "strength")
    private int strength;
    @Column(name = "username")
    private String username;
    @Column(name = "locationId")
    private UUID locationId;

    @Column(name = "uses")
    private int uses = 3;

    public Karta() {
    }

    public Karta(String username, UUID locationId) {
        this.username = username;
        this.locationId = locationId;
    }

    public Karta(UUID id, int strength, String username, UUID locationId, int uses) {
        this.id = id;
        this.strength = strength;
        this.username = username;
        this.locationId = locationId;
        this.uses = uses;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getStrength() {
        return strength;
    }

    public void setStrength(int strength) {
        this.strength = strength;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UUID getLocationId() {
        return locationId;
    }

    public void setLocationId(UUID locationId) {
        this.locationId = locationId;
    }

    public int getUses() {
        return uses;
    }

    public void setUses(int uses) {
        this.uses = uses;
    }
}
