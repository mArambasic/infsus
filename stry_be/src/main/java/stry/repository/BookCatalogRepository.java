package stry.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import stry.model.BookCatalog;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookCatalogRepository extends JpaRepository<BookCatalog, UUID> {

    @Query(value = "SELECT * FROM BookCatalog", nativeQuery = true)
    List<BookCatalog> getAllBookCatalogs();
}
