package stry.api;

import stry.model.User;
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
    public List<User> adminControlPlayers() throws IOException {
        List<User> korisnici = adminService.getAllPlayers();
        for (User k : korisnici) {
            /*byte[] image = Files.readAllBytes(Path.of(k.getPhoto()));
            String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
            k.setPhoto(encodedImage);*/
        }
        return korisnici;
    }

    @PostMapping("/api/v1/deletePlayers")
    public void deletePlayers(@RequestBody User k) {
        adminService.deletePlayers(k.getUsername());
    }


    @GetMapping("/api/v1/getAllCartographers") // nepotvrdeni kartografi
    public List<User> getAllUnconfirmedCartographers() throws IOException {
        List<User> kartografi = adminService.getAllUnconfirmedCartographers();
        for(User k: kartografi) {
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
    public void confirmKartograf(@RequestBody User user) {
        adminService.confirmKartograf(user.getUsername());
    }

}
