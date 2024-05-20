package stry.service;

import stry.model.LokacijaZaPotvrdu;
import stry.repository.LocationZaPotvrduRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LocationZaPotvrduService implements ILocationZaPotvrduService {

    @Autowired
    private LocationZaPotvrduRepository locationZaPotvrduRepository;

    public LocationZaPotvrduService(LocationZaPotvrduRepository locationZaPotvrduRepository) {
        this.locationZaPotvrduRepository = locationZaPotvrduRepository;
    }
    @Override
    public boolean addNewLocationZaPotvrdu(LokacijaZaPotvrdu novaLokacija) {
        try {
            locationZaPotvrduRepository.save(novaLokacija);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<LokacijaZaPotvrdu> getAllLocationsZaPotvrdu() {
        return locationZaPotvrduRepository.getAllLocationsZaPotvrdu();
    }

    @Override
    public Optional<LokacijaZaPotvrdu> findById(UUID id) {
        return locationZaPotvrduRepository.findById(id);
    }

    @Override
    public void saveChanges(LokacijaZaPotvrdu lzp) {
        locationZaPotvrduRepository.save(lzp);
    }

    @Override
    public void deleteLocation(LokacijaZaPotvrdu lzp) {
        locationZaPotvrduRepository.delete(lzp);
    }
}
