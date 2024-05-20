package stry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stry.repository.BookCatalogRepository;

@Service
public class BookCatalogService implements IBookCatalogService {
    @Autowired
    private BookCatalogRepository bookCatalogRepository;

    public BookCatalogService() {}

    public BookCatalogService(BookCatalogRepository bookCatalogRepository) {
        this.bookCatalogRepository = bookCatalogRepository;
    }
}
