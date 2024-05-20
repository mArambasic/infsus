package stry.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "borba")
public class Borba {
    @Id
    @Column(name = "id")
    private UUID id; // jedinstveni identifikator borbe
    @Column(name = "player1")
    private String player1Username; // korisnicko ime igraca koji je predlozio/zapoceo borbu
    @Column(name = "player2")
    private String player2Username; // korisnicko ime igraca koji je prihvatio borbu
    @Column(name = "player1Score")
    private int player1Score = -1;
    @Column(name = "player2Score")
    private int player2Score = -1;
    @Column(name = "winner")
    private String winner; // korisnicko ime igraca koji je pobjedio
    @Column(name = "loser")
    private String loser; // korisnicko ime igraca koji je izgubio

    public Borba() {
    }

    public Borba(String player1Username, String player2Username) {
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.id = UUID.randomUUID();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getPlayer1Username() {
        return player1Username;
    }

    public void setPlayer1Username(String player1Username) {
        this.player1Username = player1Username;
    }

    public String getPlayer2Username() {
        return player2Username;
    }

    public void setPlayer2Username(String player2Username) {
        this.player2Username = player2Username;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public String getLoser() {
        return loser;
    }

    public void setLoser(String loser) {
        this.loser = loser;
    }

    public void setPlayer1Score(int score) {
        this.player1Score = score;
    }

    public void setPlayer2Score(int score) {
        this.player2Score = score;
    }

    public int getPlayer1Score() { return this.player1Score;
    }

    public int getPlayer2Score() {return this.player2Score;
    }
}
