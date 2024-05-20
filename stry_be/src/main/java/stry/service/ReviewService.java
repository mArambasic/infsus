package stry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stry.repository.BookCatalogRepository;

@Service
public class ReviewService implements IReviewService {
    @Autowired
    private ReviewService reviewService;

    public ReviewService() {}

    public ReviewService(ReviewService reviewService) {
        this.reviewService = reviewService;
    }
}
