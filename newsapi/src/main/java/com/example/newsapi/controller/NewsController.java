package com.example.newsapi.controller;

import com.example.newsapi.service.NewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/articles")
    public ResponseEntity<Map<String, Object>> getArticles(@RequestParam String query) {
        Map<String, Object> articles = newsService.searchArticles(query);
        return ResponseEntity.ok(articles);
    }
}