package stry.api;

import stry.model.Korisnik;
import stry.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/api/v1/adminControlPlayers")
    public List<Korisnik> adminControlPlayers() throws IOException {
        List<Korisnik> korisnici = adminService.getAllPlayers();
        for (Korisnik k : korisnici) {
            /*byte[] image = Files.readAllBytes(Path.of(k.getPhoto()));
            String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
            k.setPhoto(encodedImage);*/
        }
        return korisnici;
    }

    @PostMapping("/api/v1/deletePlayers")
    public void deletePlayers(@RequestBody Korisnik k) {
        adminService.deletePlayers(k.getUsername());
    }

    @PostMapping("/api/v1/updatePlayers")
    public void updatePlayers(@RequestBody Korisnik k) {
        System.out.println(k);
        System.out.println(k.getUsername());
        System.out.println(k.isBanned());
        adminService.updatePlayers(k.getUsername(), k.isBanned());
    }

    @GetMapping("/api/v1/getAllCartographers") // nepotvrdeni kartografi
    public List<Korisnik> getAllUnconfirmedCartographers() throws IOException {
        List<Korisnik> kartografi = adminService.getAllUnconfirmedCartographers();
        for(Korisnik k: kartografi) {
            /*byte[] image = Files.readAllBytes(Path.of(k.getPhoto())),
                idImage = Files.readAllBytes(Path.of(k.getIdPhoto()));
            String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
            String encodedIdImage = "data:image/;base64," + Base64.getEncoder().encodeToString(idImage);
            k.setPhoto(encodedImage);
            k.setIdPhoto(encodedIdImage);*/
        }

        return kartografi;
    }

    @PostMapping("/api/v1/confirmKartograf")
    public void confirmKartograf(@RequestBody Korisnik korisnik) {
        adminService.confirmKartograf(korisnik.getUsername());
    }

}
