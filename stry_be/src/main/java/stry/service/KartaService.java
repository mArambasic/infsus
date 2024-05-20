package stry.service;

import stry.model.Karta;
import stry.model.Lokacija;
import stry.repository.KartaRepository;
import stry.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class KartaService implements IKartaService {

    @Autowired
    private KartaRepository kartaRepository;
    @Autowired
    private LocationRepository locationRepository;

    public KartaService(KartaRepository kartaRepository, LocationRepository locationRepository) {
        this.kartaRepository = kartaRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public List<Karta> findByUsername(String username) {
        return kartaRepository.findCardsByUsername(username);
    }

    @Override
    public String collectCard(UUID locationId, String username) {
        // ako korisnik vec sadrzi kartu s te lokacije, odbija se sakupljanje iste
        int brojKarataSIsteLokacije = kartaRepository.numOfCardsByLocationAndPlayer(locationId, username);
        System.out.println("Broj karata igraca s iste lokacije: " + brojKarataSIsteLokacije);
        if (brojKarataSIsteLokacije > 0)
            return "Igrac vec ima skupljenu kartu s te lokacije";
        System.out.println("Igrac trenutno nema kartu s te lokacije");

        // limit inventoryja na 20 karata
        List<Karta> karte = kartaRepository.findCardsByUsername(username);
        System.out.println("Broj karata odabranog igraca: " + karte.size());
        if (karte.size() >= 20)
            return "Dosegnut maksimalni kapacitet karata, potrosite ih u borbama";
        System.out.println("Igrac ima manje od 20 karata u inventoryju");

        // kreiranje nove karte
        Karta novaKarta = new Karta(username, locationId);
        novaKarta.setId(UUID.randomUUID());
        novaKarta.setStrength(100);
        System.out.println("Nova karta kreirana");

        // racunanje jacine karte
        Lokacija trenutnaLokacija = locationRepository.getWantedLocationById(locationId);
        double lat1 = trenutnaLokacija.getLatitude(), lon1 = trenutnaLokacija.getLongitude();

        double lat2, lon2, distance;
        List<Lokacija> sveLokacije = locationRepository.getAllLocations();
        for (Lokacija l : sveLokacije) {
            lat2 = l.getLatitude();
            lon2 = l.getLongitude();
            // distance in km
            distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) +
                                Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * 6371;
            // smanjivanje jacine karte za 1 za svaku kartu u blizini
            // smanjuje se i kad se usporeduje sama sa sobom
            if (distance < 100) {
                novaKarta.setStrength(novaKarta.getStrength() - 1);
                System.out.println("Strength se smanjuje za 1 zbog lokacije u blizini imena " + l.getName());
            }
        }
        // da se ne smanjuje za 1 kod usporedivanja same sa sobom
        novaKarta.setStrength(novaKarta.getStrength() + 1);

        // dodavanje karte
        kartaRepository.save(novaKarta);
        locationRepository.increaseCollectCount(locationId);
        return "Karta uspjesno dodana";
    }
}
