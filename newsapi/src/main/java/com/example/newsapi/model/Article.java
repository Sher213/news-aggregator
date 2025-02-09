package com.example.newsapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, columnDefinition = "TEXT")
    private String url;  // Unique URL to check duplicates

    @Column(nullable = true, columnDefinition = "TEXT")
    private String urlToImg;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
    private String description;

    private float sentimentScore;

    private Boolean fakeNewsWarning;

    public Article() {}

    public Article(String url, String urlToImg, String title, String content, String description, float sentimentScore, Boolean fakeNewsWarning) {
        this.url = url;
        this.urlToImg = urlToImg;
        this.title = title;
        this.content = content;
        this.description = description;
        this.sentimentScore = sentimentScore;
        this.fakeNewsWarning = fakeNewsWarning;
    }

    public String getUrl() { return url; }
    public String getUrlToImg() { return urlToImg; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public String getDescription() { return description; }
    public float getSentimentScore() { return sentimentScore; }
    public Boolean getFakeNewsWarning() { return fakeNewsWarning; }
}