package stry.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Review")
public class Review {
    @Id
    @NonNull
    @Column(name = "Id")
    private Long id;
    @NonNull
    @Column(name = "Rating")
    private Integer rating;
    @NonNull
    @Column(name = "Description")
    private String description;

    public Review() {
    }

    public Review(@NonNull Long id, @NonNull Integer rating, @NonNull String description) {
        this.id = id;
        this.rating = rating;
        this.description = description;
    }

    @NonNull
    public Long getId() {
        return id;
    }

    public void setId(@NonNull Long id) {
        this.id = id;
    }

    @NonNull
    public Integer getRating() {
        return rating;
    }

    public void setRating(@NonNull Integer rating) {
        this.rating = rating;
    }

    @NonNull
    public String getDescription() {
        return description;
    }

    public void setDescription(@NonNull String description) {
        this.description = description;
    }
}