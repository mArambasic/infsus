package stry.repository;

import stry.model.Karta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface KartaRepository extends JpaRepository<Karta, UUID> {

    @Query(value = "SELECT * FROM Karta k WHERE k.username = :username", nativeQuery = true)
    List<Karta> findCardsByUsername(@Param("username") String username);

    @Query(value = "SELECT COUNT(*) FROM karta k WHERE k.location_id = :locationId AND k.username = :username", nativeQuery = true)
    int numOfCardsByLocationAndPlayer(@Param("locationId") UUID locationId, @Param("username") String username);

    @Query(value = "SELECT * FROM karta k WHERE k.location_id = :locationId AND k.username = :username", nativeQuery = true)
    Karta getCardByLocationIdAndUsername(@Param("locationId") UUID locationId, @Param("username") String username);

    @Query(value = "SELECT * FROM karta WHERE id = :cardId ", nativeQuery = true)
    Karta getCardStrength(@Param("cardId") UUID cardId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM karta k WHERE k.uses<=0", nativeQuery = true)
    void deleteUsedCards();

    @Transactional
    @Modifying
    @Query(value = "UPDATE karta SET uses=uses-1 WHERE id=:cardId", nativeQuery = true)
    void decreaseCardUse(@Param("cardId") UUID cardId);
}
