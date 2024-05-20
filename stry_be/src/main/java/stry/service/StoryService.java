package stry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stry.model.Lokacija;
import stry.model.Story;
import stry.repository.BookCatalogRepository;
import stry.repository.StoryRepository;

import java.util.List;

@Service
public class StoryService implements IStoryService {
    @Autowired
    private StoryRepository storyRepository;

    public StoryService() {}

    public StoryService(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @Override
    public List<Story> getAllStories() {
        List<Story> stories = (List<Story>) storyRepository.getAllStories();
        return stories;
    }
}
