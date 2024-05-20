package stry.service;

import stry.POJOs.CardPOJO;
import stry.POJOs.FullPlayerProfilePOJO;
import stry.model.Karta;
import stry.model.Korisnik;
import stry.model.Lokacija;
import stry.repository.KartaRepository;
import stry.repository.UserRepository;
import stry.repository.LocationRepository;
import net.bytebuddy.utility.RandomString;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private KartaRepository kartaRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private JavaMailSender mailSender;

    public UserService(UserRepository userRepository, KartaRepository kartaRepository, LocationRepository locationRepository) {
        this.userRepository = userRepository;
        this.kartaRepository = kartaRepository;
        this.locationRepository = locationRepository;
    }

    private List<Korisnik> findByEmail(String email) {
        List<Korisnik> allUsers = findAll();
        List<Korisnik> retVal = new ArrayList<>();
        for (Korisnik k : allUsers) {
            if (email.contentEquals(k.getEmail())) {
                retVal.add(k);
            }
        }
        System.out.println(retVal);
        return retVal;
    }

    @Override
    public Optional<Korisnik> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    @Override
    public List<Korisnik> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Korisnik addNewUser(Korisnik user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        if (userRepository.findById(user.getUsername()).isEmpty() &&
                findByEmail(user.getEmail()).size() == 0) {

            String randomCode = RandomString.make(64);

            userRepository.save(user);
            return user;
        }
        return null;
    }

    @Override
    public String checkCredentials(String username, String password) {
        Optional<Korisnik> k = findByUsername(username);
        if(!k.isEmpty()) {
            String passwordKorisnik = k.get().getPassword();

            if(passwordKorisnik.contentEquals(password)) {
                return "success";
            }
        }
        return "fail";
    }

    @Override
    public void saveChanges(Korisnik user) {
        userRepository.save(user);
    }

    @Override
    public FullPlayerProfilePOJO getOtherProfile(String username) throws IOException {
        // settanje usernamea
        FullPlayerProfilePOJO profile = new FullPlayerProfilePOJO();
        profile.setUsername(username);

        // settanje ratinga
        Optional<Korisnik> k = findByUsername(username);
        if(k.isEmpty()) return profile;

        Korisnik user = k.get();

        // settanje slike rijeseno u controlleru jer se tamo vec nalazi gotova funkcija

        // settanje liste karata
        List<Karta> popisKarata = kartaRepository.findCardsByUsername(username);
        List<CardPOJO> jednostavneKarte = new ArrayList<>();
        for (Karta karta : popisKarata) {
            CardPOJO jednostavnaKarta = new CardPOJO();
            Lokacija lokacija = locationRepository.getWantedLocationById(karta.getLocationId());
            jednostavnaKarta.setName(lokacija.getName());
           // byte[] image = Files.readAllBytes(Path.of(lokacija.getPhoto()));
            //String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
            //jednostavnaKarta.setPhoto(encodedImage);
            jednostavneKarte.add(jednostavnaKarta);
        }
        profile.setListOfPlayerCards(jednostavneKarte);

        return profile;
    }
}
