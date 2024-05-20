package stry.POJOs;

import java.util.List;

public class FullPlayerProfilePOJO {
    private String username;
    private int rating;
    private String photo;
    private List<CardPOJO> listOfPlayerCards;

    public FullPlayerProfilePOJO() {
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public List<CardPOJO> getListOfPlayerCards() {
        return listOfPlayerCards;
    }

    public void setListOfPlayerCards(List<CardPOJO> listOfPlayerCards) {
        this.listOfPlayerCards = listOfPlayerCards;
    }
}
