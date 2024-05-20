package stry.service;

import stry.POJOs.PlayersLastBattlesPOJO;
import org.springframework.data.util.Pair;

import java.io.IOException;
import java.util.List;

public interface IStatsService {
    List<Pair<String, Integer>> getGlobalRanking();

}
