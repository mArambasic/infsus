package stry.api;

import stry.POJOs.*;
import stry.model.User;
import stry.service.BorbaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BorbaController {

    private final BorbaService borbaService;

    @Autowired
    public BorbaController(BorbaService borbaService) {this.borbaService = borbaService;}

    @PostMapping("/api/v1/startBattle")
    public String startBattle(@RequestBody StartBattlePOJO startBattlePOJO) {
        //System.out.println(startBattlePOJO.getUsername1());
        //System.out.println(startBattlePOJO.getUsername2());
        return borbaService.startBattle(startBattlePOJO.getUsername1(), startBattlePOJO.getUsername2());
    }

    @PostMapping("/api/v1/allBattles")
    public List<BorbaPOJO> allBattles(@RequestBody User k) {
        System.out.println("User koji zeli vidjeti vlastite borbe = " + k.getUsername());
        return borbaService.allBattles(k.getUsername());
    }

    @PostMapping("/api/v1/birajKarte")
    public void birajKarte(@RequestBody BirajKartePOJO birajKartePOJO) {
        System.out.println(birajKartePOJO.getUsername());
        System.out.println(birajKartePOJO.getOpponent());
        System.out.println(birajKartePOJO.getLocationName1());
        System.out.println(birajKartePOJO.getLocationName2());
        System.out.println(birajKartePOJO.getLocationName3());
        System.out.println(birajKartePOJO.getLocationName4());
        System.out.println(birajKartePOJO.getLocationName5());
        borbaService.birajKarte(birajKartePOJO);
    }

    @PostMapping("/api/v1/getBattleResult")
    public BattleResultPOJO getBattleResult(@RequestBody UserBattlePOJO userBattlePOJO) {
        return borbaService.getBattleResult(userBattlePOJO.getBattleId(), userBattlePOJO.getUsername());
    }

    /*
    @PostMapping("/api/v1/battles")
    public Collection<Borba> allBattles(@RequestBody Korisnik korisnik) {
        return borbaService.findBattlesByUsername(korisnik.getUsername());
    }

    @PostMapping("/api/v1/battles/startNewBattle")
    public String startNewBattle(@RequestBody List<Korisnik> korisnici) {
        Korisnik player1 = korisnici.get(0);
        Korisnik player2 = korisnici.get(1);
        return borbaService.startNewBattle(player1, player2);
    }

    @PostMapping("api/v1/selectedCards")
    public String selectCards(@RequestBody Borba borba) {
        //Da bude jednostavnije samo stavit:
        // "player1Username": /username trenutnog korisnika/,
        // "player2Username": /id odabranih karta u obliku stringa/ (format: id1,id2,id3),
        // "id": /id borbe/
        //Inace bi tribali imat 3 request bodya

        return borbaService.selectCards(borba.getPlayer1Username(), borba.getPlayer2Username(), borba.getId());
    }
    */
}
