package stry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stry.repository.BookCatalogRepository;
import stry.repository.ReviewRepository;

@Service
public class ReviewService implements IReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public ReviewService() {}

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
}
