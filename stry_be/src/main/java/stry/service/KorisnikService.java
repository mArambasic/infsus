package stry.service;

import stry.POJOs.CardPOJO;
import stry.POJOs.FullPlayerProfilePOJO;
import stry.model.Karta;
import stry.model.Korisnik;
import stry.model.Lokacija;
import stry.repository.KartaRepository;
import stry.repository.KorisnikRepository;
import stry.repository.LocationRepository;
import net.bytebuddy.utility.RandomString;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Service
public class KorisnikService implements IKorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepository;
    @Autowired
    private KartaRepository kartaRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private JavaMailSender mailSender;

    public KorisnikService(KorisnikRepository korisnikRepository, KartaRepository kartaRepository, LocationRepository locationRepository) {
        this.korisnikRepository = korisnikRepository;
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
        return korisnikRepository.findByUsername(username);
    }


    @Override
    public List<Korisnik> findAll() {
        return korisnikRepository.findAll();
    }

    @Override
    public Korisnik addNewUser(Korisnik korisnik, String siteURL) throws MessagingException, UnsupportedEncodingException {
        if (korisnikRepository.findById(korisnik.getUsername()).isEmpty() &&
                findByEmail(korisnik.getEmail()).size() == 0) {

            String randomCode = RandomString.make(64);
            korisnik.setVerificationCode(randomCode);
            korisnik.setEnabled(false);

            korisnikRepository.save(korisnik);

            sendVerificationEmail(korisnik, siteURL);
            return korisnik;
        }
        return null;
    }

    private void sendVerificationEmail(Korisnik korisnik, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String toAddress = korisnik.getEmail();
        String fromAddress = "STRY@yahoo.com";
        String senderName = "STRY";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "STRY.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", korisnik.getUsername());
        String verifyURL = siteURL + "/verify?code=" + korisnik.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        System.out.printf(content);

        mailSender.send(message);
    }

    @Override
    public String checkCredentials(String username, String password) {
        Optional<Korisnik> k = findByUsername(username);
        if(!k.isEmpty()) {
            String passwordKorisnik = k.get().getPassword();

            if(passwordKorisnik.contentEquals(password) && k.get().isEnabled()) {
                return "success";
            }
        }
        return "fail";
    }

    public boolean verify(String verificationCode) {
        Korisnik korisnik = korisnikRepository.findByVerificationCode(verificationCode);

        if (korisnik == null || korisnik.isEnabled()) {
            return false;
        } else {
            korisnik.setVerificationCode(null);
            korisnik.setEnabled(true);
            korisnikRepository.save(korisnik);

            return true;
        }
    }

    @Override
    public void saveChanges(Korisnik korisnik) {
        korisnikRepository.save(korisnik);
    }

    @Override
    public FullPlayerProfilePOJO getOtherProfile(String username) throws IOException {
        // settanje usernamea
        FullPlayerProfilePOJO profile = new FullPlayerProfilePOJO();
        profile.setUsername(username);

        // settanje ratinga
        Optional<Korisnik> k = findByUsername(username);
        if(k.isEmpty()) return profile;

        Korisnik korisnik = k.get();
        profile.setRating(korisnik.getRating());

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
