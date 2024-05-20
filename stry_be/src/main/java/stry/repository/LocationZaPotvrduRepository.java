package stry.repository;

import stry.model.LokacijaZaPotvrdu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface LocationZaPotvrduRepository extends JpaRepository<LokacijaZaPotvrdu, UUID> {

    @Query(value = "SELECT * FROM lokacija_za_potvrdu", nativeQuery = true)
    List<LokacijaZaPotvrdu> getAllLocationsZaPotvrdu();
}
