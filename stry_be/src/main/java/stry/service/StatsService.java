package stry.service;

import stry.model.Korisnik;
import stry.repository.BorbaRepository;
import stry.repository.UserRepository;
import stry.repository.StatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatsService implements IStatsService {
    @Autowired
    private StatsRepository statsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BorbaRepository borbaRepository;

    public StatsService() {}

    public StatsService(StatsRepository statsRepository, UserRepository userRepository, BorbaRepository borbaRepository) {
        this.statsRepository = statsRepository;
        this.userRepository = userRepository;
        this.borbaRepository = borbaRepository;
    }

    @Override
    public List<Pair<String, Integer>> getGlobalRanking() {
        List<Pair<String, Integer>> playerRatings = new ArrayList<>();
        List<Korisnik> allUsers = statsRepository.getAllByRating();
        for (Korisnik k : allUsers) {
            Pair<String, Integer> par;
//            par = Pair.of(k.getUsername(), k.getRating());
//            playerRatings.add(par);
        }
        return playerRatings;
    }
}
