package stry.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import stry.model.Category;
import stry.model.Chapter;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, UUID> {

    @Query(value = "SELECT * FROM Chapter", nativeQuery = true)
    List<Chapter> getAllChapters();
}
