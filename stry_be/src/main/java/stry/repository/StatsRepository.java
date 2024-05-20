package stry.repository;

import stry.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatsRepository extends JpaRepository<Korisnik, String> {
    @Query(value = "SELECT * FROM korisnik ORDER BY rating DESC", nativeQuery = true)
    List<Korisnik> getAllByRating();
}
