package stry.api;

import stry.exceptions.DatabaseInsertionException;
import stry.exceptions.NotEnoughParametersException;
import stry.exceptions.UserAlreadyExistsException;
import stry.model.Lokacija;
import stry.model.LokacijaZaPotvrdu;
import stry.service.ILocationService;
import stry.service.ILocationZaPotvrduService;
import stry.service.LocationService;
import stry.service.LocationZaPotvrduService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin("*")
public class LocationController {
    private ILocationService locationService;

    private ILocationZaPotvrduService locationZaPotvrduService;

    public LocationController() {
    }

    @Autowired
    public LocationController(LocationService locationService, LocationZaPotvrduService locationZaPotvrduService) {
        this.locationService = locationService;
        this.locationZaPotvrduService = locationZaPotvrduService;
    }

    @PostMapping("api/v1/addNewLocation")
    public void addNewLocation(@RequestBody Lokacija lokacija, HttpServletRequest request) {
        try {
            if (lokacija.getName() == null ||
                    lokacija.getDescription() == null ||
                    lokacija.getPhoto() == null ||
                    lokacija.getLatitude() == null ||
                    lokacija.getLongitude() == null ||
                    lokacija.getReporter() == null) {
                throw new NotEnoughParametersException("no no");
            }
            UUID newUUID = UUID.randomUUID();
            Path path = savePhoto(lokacija, newUUID);
            boolean res;
            boolean unq = locationService.checkNameUniqueness(lokacija.getName());
            if (!unq)
                throw new DatabaseInsertionException("Lokacija s istim imenom vec postoji");

            if(lokacija.getReporter().equals("Player")) {
                LokacijaZaPotvrdu novaLokacija = new LokacijaZaPotvrdu(newUUID,
                        lokacija.getName(),
                        lokacija.getDescription(),
                        path.toString(),
                        lokacija.getLatitude(),
                        lokacija.getLongitude());

                res = locationZaPotvrduService.addNewLocationZaPotvrdu(novaLokacija);
            } else {
                Lokacija novaLokacija = new Lokacija(newUUID,
                        lokacija.getName(),
                        lokacija.getDescription(),
                        path.toString(),
                        lokacija.getLatitude(),
                        lokacija.getLongitude());

                res = locationService.addNewLocation(novaLokacija);
            }
            if (res == false) {
                throw new UserAlreadyExistsException("no-no");
            }
        } catch (Exception e) {
            throw new UserAlreadyExistsException("no-no");
        }
    }

    @GetMapping("api/v1/getAllLocations")
    public List<Lokacija> getAllLocations() throws IOException {
        List<Lokacija> lok = locationService.getAllLocations();
        for(Lokacija l: lok) {
            /*byte[] image = Files.readAllBytes(Path.of(l.getPhoto()));
            String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
            l.setPhoto(encodedImage);*/
        }
        System.out.println(lok);
        return lok;
    }

    @GetMapping("api/v1/getAllSuggestedLocations")
    public List<LokacijaZaPotvrdu> getAllSuggestedLocations() throws IOException {
        List<LokacijaZaPotvrdu> lok = locationZaPotvrduService.getAllLocationsZaPotvrdu();
        for(LokacijaZaPotvrdu l: lok) {
           /* byte[] image = Files.readAllBytes(Path.of(l.getPhoto()));
            String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
            l.setPhoto(encodedImage);*/
        }
        System.out.println(lok);
        return lok;
    }

    @PostMapping("api/v1/changeLocation")
    public void changeLocation(@RequestBody LokacijaZaPotvrdu lokacijaZaPotvrdu) throws IOException {
        Optional<LokacijaZaPotvrdu> lzpOpt = locationZaPotvrduService.findById(lokacijaZaPotvrdu.getId());
        LokacijaZaPotvrdu lzp = lzpOpt.get();

        lzp.setFlagged(lokacijaZaPotvrdu.isFlagged());
        lzp.setDescription(lokacijaZaPotvrdu.getDescription());
        lzp.setName(lokacijaZaPotvrdu.getName());
        savePhoto(new Lokacija(lzp.getId(), lzp.getName(), lzp.getDescription(),
                lokacijaZaPotvrdu.getPhoto(), lzp.getLatitude(), lzp.getLongitude()), lzp.getId());


        locationZaPotvrduService.saveChanges(lzp);
    }

    @PostMapping("api/v1/getLocationById")
    public Lokacija getLocationById(@RequestBody Lokacija lokacija) throws IOException {
        Lokacija lok = locationService.getLocationById(lokacija.getId());
       /* byte[] image = Files.readAllBytes(Path.of(lok.getPhoto()));
        String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
        lok.setPhoto(encodedImage);*/
        return locationService.getLocationById(lok.getId());
    }

    public Path savePhoto(Lokacija lokacija, UUID newUUID) {
        Path path = null;

        try {
            byte[] decodedString = null;
            String folder = "src/main/resources/static/";

            decodedString = Base64.getDecoder()
                    .decode(lokacija.getPhoto().substring(lokacija.getPhoto().indexOf(',') + 1)
                            .getBytes("UTF-8"));
            path = Paths.get(folder + newUUID.toString() + ".").toAbsolutePath();

            Files.write(path, decodedString);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return path;
    }

    @PostMapping("api/v1/locationControl")
    public void locationControl(@RequestBody LokacijaZaPotvrdu lokacijaZaPotvrdu) {
        Optional<LokacijaZaPotvrdu> lzpOpt = locationZaPotvrduService.findById(lokacijaZaPotvrdu.getId());
        LokacijaZaPotvrdu lzp = lzpOpt.get();

        if(lokacijaZaPotvrdu.isApproved() == true) {
            Lokacija lokacija = new Lokacija(lzp.getId(), lzp.getName(), lzp.getDescription(), lzp.getPhoto(),
                    lzp.getLatitude(), lzp.getLongitude());
            locationZaPotvrduService.deleteLocation(lzp);
            locationService.addNewLocation(lokacija);
        } else {
            locationZaPotvrduService.deleteLocation(lzp);
        }
    }
}
