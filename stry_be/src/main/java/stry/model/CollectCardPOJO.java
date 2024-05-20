package stry.model;

import java.util.UUID;

public class CollectCardPOJO {

    private UUID locationId;
    private String username;

    public CollectCardPOJO(UUID locationId, String username) {
        this.locationId = locationId;
        this.username = username;
    }

    public UUID getLocationId() {
        return locationId;
    }

    public String getUsername() {
        return username;
    }

    public void setLocationId(UUID locationId) {
        this.locationId = locationId;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
