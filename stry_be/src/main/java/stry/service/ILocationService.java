package stry.service;

import stry.model.Lokacija;

import java.util.List;
import java.util.UUID;

public interface ILocationService {
    public boolean addNewLocation(Lokacija lokacija);

    public List<Lokacija> getAllLocations();

    Lokacija getLocationById(UUID locationId);

    boolean checkNameUniqueness(String locationName);
}
