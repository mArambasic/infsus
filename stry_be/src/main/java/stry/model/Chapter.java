package stry.model;

import org.springframework.lang.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Chapter")
public class Chapter {
    @Id
    @NonNull
    @Column(name = "Id")
    private Long id;
    @NonNull
    @Column(name = "Text")
    private String text;
    @NonNull
    @Column(name = "Name")
    private String name;

    @NonNull
    @Column(name = "WordCount")
    private Integer wordCount;

    public Chapter() {
    }

    public Chapter(@NonNull Long id, @NonNull String text, @NonNull String name, @NonNull Integer wordCount) {
        this.id = id;
        this.text = text;
        this.name = name;
        this.wordCount = wordCount;
    }

    @NonNull
    public Long getId() {
        return id;
    }

    public void setId(@NonNull Long id) {
        this.id = id;
    }

    @NonNull
    public String getText() {
        return text;
    }

    public void setText(@NonNull String text) {
        this.text = text;
    }

    @NonNull
    public String getName() {
        return name;
    }

    public void setName(@NonNull String name) {
        this.name = name;
    }

    @NonNull
    public Integer getWordCount() {
        return wordCount;
    }

    public void setWordCount(@NonNull Integer wordCount) {
        this.wordCount = wordCount;
    }
}