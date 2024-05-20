package stry.POJOs;

import java.util.List;

public class PlayersLastBattlesPOJO {
    private String username;
    private int rating;
    private int rang;
    private String photo;
    private boolean enabled;
    private boolean banned;
    private List<FinishedBattlePOJO> listOfLastGames;

    public PlayersLastBattlesPOJO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getRang() {
        return rang;
    }

    public void setRang(int rang) {
        this.rang = rang;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isBanned() {
        return banned;
    }

    public void setBanned(boolean banned) {
        this.banned = banned;
    }

    public List<FinishedBattlePOJO> getListOfLastGames() {
        return listOfLastGames;
    }

    public void setListOfLastGames(List<FinishedBattlePOJO> listOfLastGames) {
        this.listOfLastGames = listOfLastGames;
    }
}
