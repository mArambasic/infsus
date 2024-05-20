package stry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stry.repository.BookCatalogRepository;
import stry.repository.StoryRepository;

@Service
public class StoryService implements IStoryService {
    @Autowired
    private StoryRepository storyRepository;

    public StoryService() {}

    public StoryService(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }
}
