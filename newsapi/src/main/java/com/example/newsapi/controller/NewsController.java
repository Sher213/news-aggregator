package com.example.newsapi.controller;

import com.example.newsapi.model.Article;
import com.example.newsapi.repository.ArticleRepository;
import com.example.newsapi.service.NewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class NewsController {

    private final NewsService newsService;
    private final ArticleRepository articleRepository;

    public NewsController(NewsService newsService, ArticleRepository articleRepository) {
        this.newsService = newsService;
        this.articleRepository = articleRepository;
    }

    @GetMapping("/api/articles")
    public ResponseEntity<List<Article>> getArticles(@RequestParam String query) {
        List<String> urls = newsService.searchAndStoreArticles(query);  // Call the service to get URLs
        
        // Print the list of URLs for debugging
        System.out.println("URLs: " + urls);

        // Stream over the map values (URLs) and find corresponding articles
        List<Article> articles = urls.stream()  // Use .values() to stream map values (the URLs)
                .map(articleRepository::findByUrl)  // Find articles by URL
                .filter(Optional::isPresent)  // Filter out empty Optional values
                .map(Optional::get)  // Extract the Article from the Optional
                .collect(Collectors.toList());  // Collect the results into a List
        
        // Return the response based on whether articles were found
        return articles.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(articles);
    }
}
