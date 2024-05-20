package stry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stry.repository.BookCatalogRepository;
import stry.repository.ChapterRepository;

@Service
public class ChapterService implements IChapterService {
    @Autowired
    private ChapterRepository chapterRepository;

    public ChapterService() {}

    public ChapterService(ChapterRepository chapterRepository) {
        this.chapterRepository = chapterRepository;
    }
}
