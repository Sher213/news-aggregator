package com.example.newsapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String url;  // Unique URL to check duplicates

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private float sentimentScore;

    private Boolean fakeNewsWarning;

    public Article() {}

    public Article(String url, String title, String content, float sentimentScore, Boolean fakeNewsWarning) {
        this.url = url;
        this.title = title;
        this.content = content;
        this.sentimentScore = sentimentScore;
        this.fakeNewsWarning = fakeNewsWarning;
    }

    public String getUrl() { return url; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public float getSentimentScore() { return sentimentScore; }
    public Boolean getFakeNewsWarning() { return fakeNewsWarning; }
}