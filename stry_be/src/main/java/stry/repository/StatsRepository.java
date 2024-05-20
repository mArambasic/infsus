package stry.repository;

import stry.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatsRepository extends JpaRepository<User, String> {
    @Query(value = "SELECT * FROM korisnik ORDER BY rating DESC", nativeQuery = true)
    List<User> getAllByRating();
}
