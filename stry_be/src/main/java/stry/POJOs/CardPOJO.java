package stry.POJOs;

public class CardPOJO {
    private String name;
    private String photo;

    public CardPOJO() {
    }

    public CardPOJO(String name, String photo) {
        this.name = name;
        this.photo = photo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
