package stry.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import stry.service.BookCatalogService;
import stry.service.StatsService;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BookCatalogController {
    private final BookCatalogService bookCatalogService;

    @Autowired
    public BookCatalogController(BookCatalogService bookCatalogService) {
        this.bookCatalogService = bookCatalogService;
    }
}
