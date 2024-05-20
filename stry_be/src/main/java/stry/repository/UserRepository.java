package stry.repository;

import stry.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUsername(String username);

    @Query(value = "SELECT * FROM korisnik WHERE username = :username", nativeQuery = true)
    User findOtherByUsername(@Param("username") String username);
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM korisnik ORDER BY rating DESC", nativeQuery = true)
    List<User> getUsersByRating();
}
