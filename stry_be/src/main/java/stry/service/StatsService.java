package stry.service;

import stry.POJOs.FinishedBattlePOJO;
import stry.POJOs.PlayersLastBattlesPOJO;
import stry.model.Borba;
import stry.model.Korisnik;
import stry.repository.BorbaRepository;
import stry.repository.KorisnikRepository;
import stry.repository.StatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatsService implements IStatsService {
    @Autowired
    private StatsRepository statsRepository;
    @Autowired
    private KorisnikRepository korisnikRepository;
    @Autowired
    private BorbaRepository borbaRepository;

    public StatsService() {}

    public StatsService(StatsRepository statsRepository, KorisnikRepository korisnikRepository, BorbaRepository borbaRepository) {
        this.statsRepository = statsRepository;
        this.korisnikRepository = korisnikRepository;
        this.borbaRepository = borbaRepository;
    }

    @Override
    public List<Pair<String, Integer>> getGlobalRanking() {
        List<Pair<String, Integer>> playerRatings = new ArrayList<>();
        List<Korisnik> allUsers = statsRepository.getAllByRating();
        for (Korisnik k : allUsers) {
            Pair<String, Integer> par;
            par = Pair.of(k.getUsername(), k.getRating());
            playerRatings.add(par);
        }
        return playerRatings;
    }

    @Override
    public PlayersLastBattlesPOJO postPlayersLastBattles(String username) throws IOException {
        PlayersLastBattlesPOJO retVal = new PlayersLastBattlesPOJO();
        Korisnik k = korisnikRepository.findOtherByUsername(username);
        // username
        retVal.setUsername(k.getUsername());
        // rating
        retVal.setRating(k.getRating());
        // rang
        List<Korisnik> sviKorisnici = korisnikRepository.getUsersByRating();
        int rang = 1; // povecava se za 1 za svakog korisnika koji ima vise bodova od njega
        for (Korisnik kor : sviKorisnici) {
            if (kor.getRating() > k.getRating())
                rang++;
        }
        retVal.setRang(rang);
        // photo
       /* byte[] image = Files.readAllBytes(Path.of(k.getPhoto()));
        String encodedImage = "data:image/;base64," + Base64.getEncoder().encodeToString(image);
        retVal.setPhoto(encodedImage);*/
        // enabled
        retVal.setEnabled(k.isEnabled());
        // banned
        retVal.setBanned(k.isBanned());
        // listOfLastGames
        List<FinishedBattlePOJO> retValLista = new ArrayList<>();
        List<Borba> sveBorbe = (List<Borba>) borbaRepository.findBattlesByUsername(username);
        for (Borba b : sveBorbe) {
            // izbacivanje nezavrsenih borbi
            if (b.getPlayer1Score() <= 0 || b.getPlayer2Score() <= 0)
                continue;

            FinishedBattlePOJO fbp = new FinishedBattlePOJO();

            // user je player1 i pobijedio je
            if (b.getPlayer1Username().equals(username) && b.getPlayer1Score() >= b.getPlayer2Score()) {
                fbp.setResult("Win");
                fbp.setUserScore(b.getPlayer1Score());
                fbp.setOpponent(b.getPlayer2Username());
                fbp.setOpponentScore(b.getPlayer2Score());
            }
            // user je player2 i pobijedio je
            else if (b.getPlayer2Username().equals(username) && b.getPlayer2Score() > b.getPlayer1Score()) {
                fbp.setResult("Win");
                fbp.setUserScore(b.getPlayer2Score());
                fbp.setOpponent(b.getPlayer1Username());
                fbp.setOpponentScore(b.getPlayer1Score());
            }
            // user je player1 i izgubio je
            else if (b.getPlayer1Username().equals(username) && b.getPlayer1Score() < b.getPlayer2Score()) {
                fbp.setResult("Loss");
                fbp.setUserScore(b.getPlayer1Score());
                fbp.setOpponent(b.getPlayer2Username());
                fbp.setOpponentScore(b.getPlayer2Score());
            }
            // user je player2 i izgubio je
            else if (b.getPlayer2Username().equals(username) && b.getPlayer2Score() <= b.getPlayer1Score()) {
                fbp.setResult("Loss");
                fbp.setUserScore(b.getPlayer2Score());
                fbp.setOpponent(b.getPlayer1Username());
                fbp.setOpponentScore(b.getPlayer1Score());
            }

            retValLista.add(fbp);
        }
        retVal.setListOfLastGames(retValLista);
        return retVal;
    }
}
