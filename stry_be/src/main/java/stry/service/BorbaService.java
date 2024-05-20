package stry.service;

import stry.POJOs.BattleResultPOJO;
import stry.POJOs.BirajKartePOJO;
import stry.POJOs.BorbaPOJO;
import stry.model.Borba;
import stry.model.Karta;
import stry.repository.BorbaRepository;
import stry.repository.KartaRepository;
import stry.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BorbaService implements IBorbaService {

    @Autowired
    private BorbaRepository borbaRepository;
    @Autowired
    private KartaRepository kartaRepository;
    @Autowired
    private LocationRepository locationRepository;

    public BorbaService() {}

    public BorbaService(BorbaRepository borbaRepository, KartaRepository kartaRepository, LocationRepository locationRepository) {
        this.borbaRepository = borbaRepository;
        this.kartaRepository = kartaRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public String startBattle(String username1, String username2) {
        List<Karta> p1Karte = kartaRepository.findCardsByUsername(username1);
        if (p1Karte.size() < 5)
            return "Nemate dovoljno karata (potrebno ih je barem 5)";
        List<Borba> postojane = borbaRepository.findBattleByUsernamePair(username1, username2);
        int zavrsene = 0;
        for (Borba b : postojane) {
            if (b.getPlayer1Score() > 0 && b.getPlayer2Score() > 0)
                zavrsene++;
        }
        if (zavrsene < postojane.size())
            return "Već postoji aktivna borba s odabranim protivnikom";
        Borba b = new Borba(username1, username2);
        borbaRepository.save(b);
        return "Borba započeta";
    }

    @Override
    public List<BorbaPOJO> allBattles(String username) {
        List<Borba> sveBorbe = (List<Borba>) borbaRepository.findBattlesByUsername(username);
        List<BorbaPOJO> borbaPOJOS = new ArrayList<>();
        for (Borba b : sveBorbe) {
            BorbaPOJO abp = new BorbaPOJO();
            if (b.getPlayer1Username().equals(username)) {
                abp.setOpponent(b.getPlayer2Username());
                if (b.getPlayer1Score() <= 0)
                    abp.setState(0); // biranje karata
                else if (b.getPlayer1Score() > 0 && b.getPlayer2Score() <= 0)
                    abp.setState(1); // cekanje protivnika
                else if (b.getPlayer1Score() > 0 && b.getPlayer2Score() > 0)
                    abp.setState(2); // borba gotova
            }
            else {
                abp.setOpponent(b.getPlayer1Username());
                if (b.getPlayer2Score() <= 0)
                    abp.setState(0); // biranje karata
                else if (b.getPlayer2Score() > 0 && b.getPlayer1Score() <= 0)
                    abp.setState(1); // cekanje protivnika
                else if (b.getPlayer2Score() > 0 && b.getPlayer1Score() > 0)
                    abp.setState(2); // borba gotova
            }
            abp.setId(b.getId());
            borbaPOJOS.add(abp);
        }
        // sortiranje karata po fazi - nezapocete, u tijeku i gotove
        // dodavanje nezapocetih
        List<BorbaPOJO> retVal = new ArrayList<>();
        for (BorbaPOJO bp : borbaPOJOS) {
            BorbaPOJO newBp = new BorbaPOJO();
            if (bp.getState() == 0) {
                newBp.setOpponent(bp.getOpponent());
                newBp.setState(bp.getState());
                newBp.setId(bp.getId());
                retVal.add(newBp);
            }
        }
        // dodavanje borbi u tijeku
        for (BorbaPOJO bp : borbaPOJOS) {
            BorbaPOJO newBp = new BorbaPOJO();
            if (bp.getState() == 1) {
                newBp.setOpponent(bp.getOpponent());
                newBp.setState(bp.getState());
                newBp.setId(bp.getId());
                retVal.add(newBp);
            }
        }
        // dodavanje gotovih borbi
        for (BorbaPOJO bp : borbaPOJOS) {
            BorbaPOJO newBp = new BorbaPOJO();
            if (bp.getState() == 2) {
                newBp.setOpponent(bp.getOpponent());
                newBp.setState(bp.getState());
                newBp.setId(bp.getId());
                retVal.add(newBp);
            }

        }

        return retVal;
    }

    @Override
    public void birajKarte(BirajKartePOJO birajKartePOJO) {
        // dobivanje cardID-jeva
        UUID locationId1, locationId2, locationId3, locationId4, locationId5;
        locationId1 = locationRepository.getLocationIdByName(birajKartePOJO.getLocationName1()).getId();
        locationId2 = locationRepository.getLocationIdByName(birajKartePOJO.getLocationName2()).getId();
        locationId3 = locationRepository.getLocationIdByName(birajKartePOJO.getLocationName3()).getId();
        locationId4 = locationRepository.getLocationIdByName(birajKartePOJO.getLocationName4()).getId();
        locationId5 = locationRepository.getLocationIdByName(birajKartePOJO.getLocationName5()).getId();
        UUID cardId1, cardId2, cardId3, cardId4, cardId5;
        cardId1 = kartaRepository.getCardByLocationIdAndUsername(locationId1, birajKartePOJO.getUsername()).getId();
        cardId2 = kartaRepository.getCardByLocationIdAndUsername(locationId2, birajKartePOJO.getUsername()).getId();
        cardId3 = kartaRepository.getCardByLocationIdAndUsername(locationId3, birajKartePOJO.getUsername()).getId();
        cardId4 = kartaRepository.getCardByLocationIdAndUsername(locationId4, birajKartePOJO.getUsername()).getId();
        cardId5 = kartaRepository.getCardByLocationIdAndUsername(locationId5, birajKartePOJO.getUsername()).getId();


        // zbroj svih karata
        int score = 0;
        score += kartaRepository.getCardStrength(cardId1).getStrength();
        score += kartaRepository.getCardStrength(cardId2).getStrength();
        score += kartaRepository.getCardStrength(cardId3).getStrength();
        score += kartaRepository.getCardStrength(cardId4).getStrength();
        score += kartaRepository.getCardStrength(cardId5).getStrength();

        // settanje scorea u odgovarajucoj bitci
        List<Borba> borbe = (List<Borba>) borbaRepository.findBattleByUsernamePair(birajKartePOJO.getUsername(),
                                                                                   birajKartePOJO.getOpponent());
        for (Borba b : borbe) {
            if (b.getPlayer1Score() > 0 && b.getPlayer2Score() > 0)
                continue;
            if (b.getPlayer1Username().equals(birajKartePOJO.getUsername()) && b.getPlayer1Score() <= 0)
                b.setPlayer1Score(score);
            else if (b.getPlayer2Username().equals(birajKartePOJO.getUsername()) && b.getPlayer2Score() <= 0)
                b.setPlayer2Score(score);
        }

        // smanjivanje uses za odgovarajuce karte
        kartaRepository.decreaseCardUse(cardId1);
        kartaRepository.decreaseCardUse(cardId2);
        kartaRepository.decreaseCardUse(cardId3);
        kartaRepository.decreaseCardUse(cardId4);
        kartaRepository.decreaseCardUse(cardId5);

        // ocisti inventory gdje su uses = 0
        kartaRepository.deleteUsedCards();
    }

    @Override
    public BattleResultPOJO getBattleResult(UUID battleId, String username) {
        BattleResultPOJO brp = new BattleResultPOJO();
        Borba b = borbaRepository.findBattleById(battleId);
        // postavljanje winnera i losera
        if (b.getPlayer1Score() >= b.getPlayer2Score()) {
            b.setWinner(b.getPlayer1Username());
            b.setLoser(b.getPlayer2Username());
        } else {
            b.setWinner(b.getPlayer2Username());
            b.setLoser(b.getPlayer1Username());
        }
        borbaRepository.save(b);

        // user je player1 i pobijedio je
        if (b.getPlayer1Username().equals(username) && b.getPlayer1Score() >= b.getPlayer2Score()) {
            brp.setResult("Win");
            brp.setUserScore(b.getPlayer1Score());
            brp.setOpponentScore(b.getPlayer2Score());
        }
        // user je player2 i pobijedio je
        else if (b.getPlayer2Username().equals(username) && b.getPlayer2Score() > b.getPlayer1Score()) {
            brp.setResult("Win");
            brp.setUserScore(b.getPlayer2Score());
            brp.setOpponentScore(b.getPlayer1Score());
        }
        // user je player1 i izgubio je
        else if (b.getPlayer1Username().equals(username) && b.getPlayer1Score() < b.getPlayer2Score()) {
            brp.setResult("Lose");
            brp.setUserScore(b.getPlayer1Score());
            brp.setOpponentScore(b.getPlayer2Score());
        }
        // user je player2 i izgubio je
        else if (b.getPlayer2Username().equals(username) && b.getPlayer2Score() <= b.getPlayer1Score()) {
            brp.setResult("Lose");
            brp.setUserScore(b.getPlayer2Score());
            brp.setOpponentScore(b.getPlayer1Score());
        }

        return brp;
    }

    /*
    @Override
    public Collection<Borba> findBattlesByUsername(String username) {

        return borbaRepository.findBattlesByUsername(username);
    }

    @Override
    public String startNewBattle(Korisnik player1, Korisnik player2) {
        List<Karta> p1Karte = kartaRepository.findCardsByUsername(player1.getUsername()),
                p2Karte = kartaRepository.findCardsByUsername(player2.getUsername());
        if(p1Karte.size() < 1 || p2Karte.size() < 1) return "Nedovoljan broj karata za započinjanje borbe";
        Borba b = new Borba(player1.getUsername(), player2.getUsername());
        borbaRepository.save(b);
        return "Borba započeta";
    }

    @Override
    public String selectCards(String username, String selectedCards, UUID IDBorbe) {
        //Ako trenutni korisnik ceka onda mu vracamo njegov score u obliku stringa da se moze prikazat
        //Ako su obojica odabrali karte onda vraca ko je pobijedia
        Optional<Borba> borbaOptional = borbaRepository.findById(IDBorbe);
        if(!borbaOptional.isEmpty()) {
            Borba borba = borbaOptional.get();
            int score = getScoreFromCard(selectedCards);
            if(borba.getPlayer1Username().contentEquals(username)) {
                borba.setPlayer1Score(score);
            } else if(borba.getPlayer2Username().contentEquals(username)) {
                borba.setPlayer2Score(score);
            }
            if(borba.getPlayer1Score() != -1 && borba.getPlayer2Score() != -1) {
                int p1Score = borba.getPlayer1Score(), p2Score = borba.getPlayer2Score();
                if(p1Score > p2Score) borba.setLoser(borba.getPlayer2Username());
                else borba.setLoser(borba.getPlayer1Username());
                borbaRepository.save(borba);
                return borba.getLoser();
            } else {
                borbaRepository.save(borba);
                return String.valueOf(score);
            }
        } else return "error";
    }

    private int getScoreFromCard(String selectedCards) {
        int score = 0, uses = -1;
        String[] cards = selectedCards.split(",");
        for(String idKarte: cards) {
            UUID idK = UUID.fromString(idKarte);
            Optional<Karta> kartaOptional = kartaRepository.findById(idK);
            if(!kartaOptional.isEmpty()) {
                Karta karta = kartaOptional.get();
                uses = karta.getUses();
                if(uses < 1) score += karta.getStrength();
                else {
                    uses--;
                    karta.setUses(uses);
                    if(uses == 0) kartaRepository.delete(karta);
                }
                kartaRepository.save(karta);
            }
        }
        return score;
    }
    */
}
