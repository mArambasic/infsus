package stry.api;

import stry.POJOs.CollectCardPOJO;
import stry.model.Karta;
import stry.model.Korisnik;
import stry.service.IKartaService;
import stry.service.KartaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class KartaController {

    private final IKartaService kartaService;

    @Autowired
    public KartaController(KartaService kartaService) {this.kartaService = kartaService;}

    @PostMapping("api/v1/getUserCards")
    public List<Karta> getUserCards(@RequestBody Korisnik user) {
        return kartaService.findByUsername(user.getUsername());
    }

    @PostMapping("api/v1/collectCard")
    @ResponseBody
    public String collectCard(@RequestBody CollectCardPOJO collectCardPOJO) {
        System.out.println(collectCardPOJO);
        System.out.println(collectCardPOJO.getLocationId());
        System.out.println(collectCardPOJO.getUsername());
        return kartaService.collectCard(collectCardPOJO.getLocationId(), collectCardPOJO.getUsername());
    }

}
