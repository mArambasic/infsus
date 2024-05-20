package stry.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "PublishingHouse")
public class PublishingHouse {
    @Id
    @NonNull
    @Column(name = "Id")
    private Long id;
    @NonNull
    @Column(name = "Name")
    private String name;
    @NonNull
    @Column(name = "Year")
    private Integer year;

    public PublishingHouse() {
    }

    public PublishingHouse(@NonNull Long id, @NonNull String name, @NonNull Integer year) {
        this.id = id;
        this.name = name;
        this.year = year;
    }

    @NonNull
    public Long getId() {
        return id;
    }

    public void setId(@NonNull Long id) {
        this.id = id;
    }

    @NonNull
    public String getName() {
        return name;
    }

    public void setName(@NonNull String name) {
        this.name = name;
    }

    @NonNull
    public Integer getYear() {
        return year;
    }

    public void setYear(@NonNull Integer year) {
        this.year = year;
    }
}
