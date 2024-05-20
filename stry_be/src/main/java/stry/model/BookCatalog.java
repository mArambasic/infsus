package stry.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BookCatalog")
public class BookCatalog {
    @Id
    @NonNull
    @Column(name = "Id")
    private Long id;
    @NonNull
    @Column(name = "Name")
    private String name;

    public BookCatalog() {
    }

    public BookCatalog(@NonNull Long id, @NonNull String name) {
        this.id = id;
        this.name = name;
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
}

