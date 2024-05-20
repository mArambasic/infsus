package stry.service;

import stry.model.Lokacija;
import stry.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LocationService implements ILocationService{
    @Autowired
    private LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public boolean addNewLocation(Lokacija lokacija) {
        try {
            locationRepository.save(lokacija);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Override
    public List<Lokacija> getAllLocations() {
        List<Lokacija> lokacije = (List<Lokacija>) locationRepository.getAllLocations();
        return lokacije;
    }

    @Override
    public Lokacija getLocationById(UUID locationId) {
        System.out.println(locationId);
        return locationRepository.getWantedLocationById(locationId);
    }

    @Override
    public boolean checkNameUniqueness(String locationName) {
        List<Lokacija> lokacijeSIstimImenom = locationRepository.findLocationsByName(locationName);
        if (lokacijeSIstimImenom.size() > 0)
            return false;
        return true;
    }
}
