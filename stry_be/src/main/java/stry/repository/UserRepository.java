package stry.repository;

import stry.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Korisnik, String> {

    Optional<Korisnik> findByUsername(String username);

    @Query(value = "SELECT * FROM korisnik WHERE username = :username", nativeQuery = true)
    Korisnik findOtherByUsername(@Param("username") String username);
    Optional<Korisnik> findByEmail(String email);

    @Query(value = "SELECT * FROM korisnik ORDER BY rating DESC", nativeQuery = true)
    List<Korisnik> getUsersByRating();
}
