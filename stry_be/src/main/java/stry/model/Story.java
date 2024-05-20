package stry.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "Story")
public class Story {
    @Id
    @NonNull
    @Column(name = "Id")
    private Long id;

    @NonNull
    @Column(name = "Title")
    private String title;
    @NonNull
    @Column(name = "Score")
    private Float score;
    @NonNull
    @Column(name = "Date")
    private Date date;
    @NonNull
    @Column(name = "Author")
    private String author;

    public Story() {
    }

    public Story(@NonNull Long id, @NonNull String title, @NonNull Float score, @NonNull Date date, @NonNull String author) {
        this.id = id;
        this.title = title;
        this.score = score;
        this.date = date;
        this.author = author;
    }

    @NonNull
    public Long getId() {
        return id;
    }

    public void setId(@NonNull Long id) {
        this.id = id;
    }

    @NonNull
    public String getTitle() {
        return title;
    }

    public void setTitle(@NonNull String title) {
        this.title = title;
    }

    @NonNull
    public Float getScore() {
        return score;
    }

    public void setScore(@NonNull Float score) {
        this.score = score;
    }

    @NonNull
    public Date getDate() {
        return date;
    }

    public void setDate(@NonNull Date date) {
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
