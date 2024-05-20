package stry.repository;

import stry.model.Borba;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Repository
public interface BorbaRepository extends JpaRepository<Borba, UUID> {

    @Query(value= "SELECT * FROM borba WHERE player1 = :username OR player2 = :username", nativeQuery = true)
    Collection<Borba> findBattlesByUsername(@Param("username") String username);

    @Query(value = "SELECT * FROM borba WHERE player1 = :username1 AND player2 = :username2" +
                                         " OR player1 = :username2 AND player2 = :username1", nativeQuery = true)
    List<Borba> findBattleByUsernamePair(@Param("username1") String username1, @Param("username2") String username2);

    @Query(value = "SELECT * FROM borba WHERE id = :battleId", nativeQuery = true)
    Borba findBattleById(@Param("battleId") UUID battleId);

    /*
    @Transactional
    @Modifying
    @Query(value = "UPDATE borba SET banned=:banned WHERE username=:username", nativeQuery = true)
    void setPlayer1Score(String username, String opponent, int score);
    */
}
