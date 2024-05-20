package stry.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Story")
public class Story {
    @Id
    @NonNull
    @Column(name = "Title")
    private String title;
    @NonNull
    @Column(name = "Score")
    private String score;
    @NonNull
    @Column(name = "Date", unique = true)
    private String date;
    @NonNull
    @Column(name = "Author", unique = true)
    private String author;

    public Story() {
    }

    public Story(@NonNull String title, @NonNull String score, @NonNull String date, @NonNull String author) {
        this.title = title;
        this.score = score;
        this.date = date;
        this.author = author;
    }

    @NonNull
    public String getTitle() {
        return title;
    }

    public void setTitle(@NonNull String title) {
        this.title = title;
    }

    @NonNull
    public String getScore() {
        return score;
    }

    public void setScore(@NonNull String score) {
        this.score = score;
    }

    @NonNull
    public String getDate() {
        return date;
    }

    public void setDate(@NonNull String date) {
        this.date = date;
    }

    @NonNull
    public String getAuthor() {
        return author;
    }

    public void setAuthor(@NonNull String author) {
        this.author = author;
    }
}
