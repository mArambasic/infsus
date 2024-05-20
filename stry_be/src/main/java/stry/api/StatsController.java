package stry.api;

import stry.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class StatsController {
    private final StatsService statsService;

    @Autowired
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("api/v1/ranking")
    @ResponseBody
    public List<Pair<String, Integer>> ranking() {
        return statsService.getGlobalRanking();
    }
}
