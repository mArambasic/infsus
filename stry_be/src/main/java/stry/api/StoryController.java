package stry.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import stry.model.Lokacija;
import stry.model.Story;
import stry.service.IStoryService;
import stry.service.StatsService;
import stry.service.StoryService;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
public class StoryController {
    private final IStoryService storyService;

    @Autowired
    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @GetMapping("api/v1/getAllStories")
    public List<Story> getAllStories() throws IOException {
        List<Story> stories = storyService.getAllStories();
        return stories;
    }
}
