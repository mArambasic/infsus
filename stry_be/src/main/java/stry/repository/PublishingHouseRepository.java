package stry.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import stry.model.Category;
import stry.model.PublishingHouse;

import java.util.List;
import java.util.UUID;

@Repository
public interface PublishingHouseRepository extends JpaRepository<PublishingHouse, UUID> {

    @Query(value = "SELECT * FROM PublishingHouse", nativeQuery = true)
    List<PublishingHouse> getAllPublishingHouses();
}
