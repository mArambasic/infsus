package stry.api;


import stry.POJOs.FullPlayerProfilePOJO;
import stry.exceptions.NotEnoughParametersException;
import stry.exceptions.UserAlreadyExistsException;
import stry.exceptions.UserNotFoundException;
import stry.model.Korisnik;
import stry.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class KorisnikController {
    private final KorisnikService korisnikService;

    @Autowired
    public KorisnikController(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code, Model model) {
        boolean result = korisnikService.verify(code);
        if (result) return "success";
        else return "fail";
    }

    @PostMapping("/api/v1/allUsers")
    public String login(@RequestBody Korisnik korisnik) {
        if (korisnik.getUsername() == null ||
                korisnik.getPassword() == null) {
            throw new NotEnoughParametersException("no no");
        }
        String res = korisnikService.checkCredentials(korisnik.getUsername(), korisnik.getPassword());
        Optional<Korisnik> k = korisnikService.findByUsername(korisnik.getUsername());
        if (res.equals("fail")) {
            throw new UserNotFoundException("Pogresno korisnicko ime ili lozinka");
        }
        System.out.println(k.get().getRole());
        return k.get().getRole();
    }

    @PostMapping("api/v1/addNewPlayer") // http://localhost:8080/api/v1/addNewPlayer
    public void addNewPlayer(@RequestBody Korisnik korisnik, HttpServletRequest request) {
        String siteURL = getSiteUrl(request);
        try {
            if (korisnik.getUsername() == null ||
                    korisnik.getPassword() == null ||
                    korisnik.getPhoto() == null ||
                    korisnik.getEmail() == null) {
                throw new NotEnoughParametersException("no no");
            }

            Path path = savePhoto(korisnik, 0);

            Korisnik newUser = new Korisnik(korisnik.getUsername(),
                    korisnik.getPassword(),
                    path.toString(),
                    korisnik.getEmail());
            var res = korisnikService.addNewUser(newUser, siteURL);
            if (res == null) {
                throw new UserAlreadyExistsException("no-no");
            }
        } catch (Exception e) {
            throw new UserAlreadyExistsException("no-no");
        }
    }

    @PostMapping("api/v1/addNewCartographer")
    public void addNewCartographer(@RequestBody Korisnik korisnik, HttpServletRequest request) {
        String siteURL = getSiteUrl(request);

        try {
            if (korisnik.getUsername() == null ||
                    korisnik.getPassword() == null ||
                    korisnik.getPhoto() == null ||
                    korisnik.getEmail() == null ||
                    korisnik.getIdPhoto() == null ||
                    korisnik.getIban() == null) {
                throw new NotEnoughParametersException("no no");
            }

            Path path0 = savePhoto(korisnik, 0);
            Path path1 = savePhoto(korisnik, 1);

            Korisnik newUser = new Korisnik(korisnik.getUsername(),
                    korisnik.getPassword(),
                    path0.toString(),
                    korisnik.getEmail(),
                    path1.toString(),
                    korisnik.getIban());
            var res = korisnikService.addNewUser(newUser, siteURL);
            if (res == null) {
                throw new UserAlreadyExistsException("no-no");
            }
        } catch (Exception e) {
            throw new UserAlreadyExistsException("no-no");
        }
    }

    private String getSiteUrl(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    public Path savePhoto(Korisnik korisnik, int uloga) {
        Path path = null;

        try {
            byte[] decodedString = null;
            String folder = "src/main/resources/static/";

            if(uloga == 0) {
                decodedString = Base64.getDecoder()
                        .decode(korisnik.getPhoto().substring(korisnik.getPhoto().indexOf(',') + 1)
                                .getBytes("UTF-8"));
                path = Paths.get(folder + korisnik.getUsername() + ".").toAbsolutePath();
            } else {
                decodedString = Base64.getDecoder()
                        .decode(korisnik.getIdPhoto().substring(korisnik.getIdPhoto().indexOf(',') + 1)
                                .getBytes("UTF-8"));
                path = Paths.get(folder + korisnik.getUsername() + "ID.").toAbsolutePath();
            }
            Files.write(path, decodedString);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return path;
    }

    @PostMapping("api/v1/profileImage")
    @ResponseBody
    public String profileImage(@RequestBody Korisnik korisnik) throws IOException {
        Optional<Korisnik> k = korisnikService.findByUsername(korisnik.getUsername());

       // byte[] image = Files.readAllBytes(Path.of(k.get().getPhoto()));

       // String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);

        return k.get().getPhoto();
    }

    @PostMapping("api/v1/profileChangeSaved")
    public void saveChanges(@RequestBody Korisnik korisnik) {
        Optional<Korisnik> k = korisnikService.findByUsername(korisnik.getUsername());

        k.get().setPassword(korisnik.getPassword());
        savePhoto(korisnik, 0);


        korisnikService.saveChanges(k.get());
    }

    @PostMapping("/api/v1/getOtherProfile")
    public FullPlayerProfilePOJO getOtherProfile(@RequestBody Korisnik korisnik) throws IOException {
        FullPlayerProfilePOJO retVal = korisnikService.getOtherProfile(korisnik.getUsername());
        Optional<Korisnik> k = korisnikService.findByUsername(korisnik.getUsername());
        //byte[] image = Files.readAllBytes(Path.of(k.get().getPhoto()));
       // String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
        retVal.setPhoto(k.get().getPhoto());
        return retVal;
    }
}
