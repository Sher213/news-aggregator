package com.example.newsapi.controller;

import com.example.newsapi.model.Article;
import com.example.newsapi.repository.ArticleRepository;
import com.example.newsapi.service.NewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.*;
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
    public CompletableFuture<ResponseEntity<List<Article>>> getArticles(@RequestParam String query) {
        List<String> urls = newsService.searchAndStoreArticles(query);
        System.out.println("URLs: " + urls);

        // Fetch articles but always wait 7 seconds before completing
        CompletableFuture<List<Article>> fetchArticles = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(7); // Force the fetch operation to take 7 seconds
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException("Interrupted while waiting", e);
            }
            return urls.stream()
                    .map(articleRepository::findByUrl)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());
        });

        return fetchArticles.thenApply(articles ->
                articles.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(articles)
        );
    }
}