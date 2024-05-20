package stry.POJOs;

public class BattleResultPOJO {
    private String result;
    private int userScore;
    private int opponentScore;

    public BattleResultPOJO() {
    }

    public BattleResultPOJO(String result, int userScore, int opponentScore) {
        this.result = result;
        this.userScore = userScore;
        this.opponentScore = opponentScore;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public int getUserScore() {
        return userScore;
    }

    public void setUserScore(int userScore) {
        this.userScore = userScore;
    }

    public int getOpponentScore() {
        return opponentScore;
    }

    public void setOpponentScore(int opponentScore) {
        this.opponentScore = opponentScore;
    }
}
