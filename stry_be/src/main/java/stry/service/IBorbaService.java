package stry.service;

import stry.POJOs.BattleResultPOJO;
import stry.POJOs.BirajKartePOJO;
import stry.POJOs.BorbaPOJO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface IBorbaService {

    String startBattle(String username1, String username2);

    List<BorbaPOJO> allBattles(String username);

    void birajKarte(BirajKartePOJO birajKartePOJO);

    BattleResultPOJO getBattleResult(UUID battleId, String username);

    /*
    public Collection<Borba> findBattlesByUsername(String username);
    public String startNewBattle(Korisnik username1, Korisnik username2);
    String selectCards(String username, String selectedCards, UUID IDBorbe);
    */
}
