package stry.service;

import stry.model.LokacijaZaPotvrdu;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ILocationZaPotvrduService {

    public boolean addNewLocationZaPotvrdu(LokacijaZaPotvrdu novaLokacija);

    public List<LokacijaZaPotvrdu> getAllLocationsZaPotvrdu();

    Optional<LokacijaZaPotvrdu> findById(UUID id);

    void saveChanges(LokacijaZaPotvrdu lzp);

    void deleteLocation(LokacijaZaPotvrdu lzp);
}
