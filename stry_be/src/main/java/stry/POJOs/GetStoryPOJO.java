package stry.POJOs;

import java.util.UUID;


public class CreateStoryPOJO {

    private String username;
    private String title;

    public CreateStoryPOJO(String username, String title) {
        this.username = username;
        this.title = title;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}