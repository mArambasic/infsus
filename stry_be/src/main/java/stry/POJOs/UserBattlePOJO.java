package stry.POJOs;

import java.util.UUID;

public class UserBattlePOJO {
    private String username;
    private UUID battleId;

    public UserBattlePOJO() {
    }

    public UserBattlePOJO(String username, UUID battleId) {
        this.username = username;
        this.battleId = battleId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UUID getBattleId() {
        return battleId;
    }

    public void setBattleId(UUID battleId) {
        this.battleId = battleId;
    }
}
