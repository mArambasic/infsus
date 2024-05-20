package stry.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import stry.model.Category;
import stry.model.Lokacija;
import stry.model.Story;

import java.util.List;
import java.util.UUID;

@Repository
public interface StoryRepository extends JpaRepository<Story, UUID> {

    @Query(value = "SELECT * FROM story", nativeQuery = true)
    List<Story> getAllStories();
}
