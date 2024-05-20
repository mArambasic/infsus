package stry.repository;

import stry.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<User, String> {

    @Query(value = "SELECT * FROM korisnik ORDER BY rating DESC", nativeQuery = true)
    List<User> getAllPlayers();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM korisnik k WHERE k.username=:username", nativeQuery = true)
    void deletePlayers(@Param("username") String username);

    @Transactional
    @Modifying
    @Query(value = "UPDATE korisnik SET banned=:banned WHERE username=:username", nativeQuery = true)
    void updatePlayers(@Param("username") String username, @Param("banned") boolean banned);

    @Query(value = "SELECT * FROM korisnik WHERE iban IS NOT NULL AND role = 'Player'", nativeQuery = true)
    List<User> getAllUnconfirmedCartographers();

    @Transactional
    @Modifying
    @Query(value = "UPDATE korisnik SET role='Cartographer' WHERE username=:username", nativeQuery = true)
    void confirmKartograf(@Param("username") String username);
}
