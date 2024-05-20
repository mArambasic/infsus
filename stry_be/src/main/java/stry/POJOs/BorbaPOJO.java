package stry.POJOs;

import java.util.UUID;

public class BorbaPOJO {
    private UUID id;
    private String opponent;
    private int state;

    public BorbaPOJO() {
    }

    public BorbaPOJO(UUID id, String opponent, int state) {
        this.id = id;
        this.opponent = opponent;
        this.state = state;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getOpponent() {
        return opponent;
    }

    public void setOpponent(String opponent) {
        this.opponent = opponent;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
