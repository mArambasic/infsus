package stry.repository;

import stry.model.Lokacija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface LocationRepository extends JpaRepository<Lokacija, UUID> {
    @Query(value = "SELECT * FROM lokacija ORDER BY times_collected DESC", nativeQuery = true)
    List<Lokacija> getAllLocations();

    /*
    @Query(value = "SELECT * FROM lokacija WHERE id = :locationId", nativeQuery = true)
    Lokacija getLocationById(@Param("locationId") UUID locationId);
    */

    @Query(value = "SELECT * FROM lokacija WHERE id = :locationId", nativeQuery = true)
    Lokacija getWantedLocationById(UUID locationId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE lokacija SET times_collected = times_collected+1 WHERE id = :locationId", nativeQuery = true)
    void increaseCollectCount(@Param("locationId") UUID locationId);

    @Query(value = "SELECT * FROM lokacija WHERE name = :locationName", nativeQuery = true)
    List<Lokacija> findLocationsByName(@Param("locationName") String locationName);

    @Query(value = "SELECT * FROM lokacija WHERE name = :locationName", nativeQuery = true)
    Lokacija getLocationIdByName(@Param("locationName") String locationName);
}
