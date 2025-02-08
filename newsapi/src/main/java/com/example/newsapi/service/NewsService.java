package com.example.newsapi.service;

import com.example.newsapi.config.NewsApiConfig;
import com.example.newsapi.model.Article;
import com.example.newsapi.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class NewsService {

    private final RestTemplate restTemplate;
    private final NewsApiConfig newsApiConfig;
    private final ArticleRepository articleRepository;

    public NewsService(RestTemplate restTemplate, NewsApiConfig newsApiConfig, ArticleRepository articleRepository) {
        this.restTemplate = restTemplate;
        this.newsApiConfig = newsApiConfig;
        this.articleRepository = articleRepository;
    }

    public List<String> searchAndStoreArticles(String query) {
        List<String> response = new ArrayList<>();

        // API call to fetch articles
        String url = String.format("%s?q=%s&apiKey=%s", newsApiConfig.getNewsApiUrl(), query, newsApiConfig.getApiKey());
        Map<String, Object> apiResponse = restTemplate.getForObject(url, Map.class);

        if (apiResponse == null || !apiResponse.containsKey("articles")) {
            response.add("No articles found or API request failed.");
            return response;
        }

        // Extract articles from API response
        List<Map<String, Object>> articles = (List<Map<String, Object>>) apiResponse.get("articles");

        for (Map<String, Object> articleData : articles) {
            String articleUrl = (String) articleData.get("url");
            String title = (String) articleData.get("title");
            String content = (String) articleData.getOrDefault("content", "No content available");

            if (articleUrl == null || title == null) {
                continue; // Skip invalid articles
            }

            // Check if article already exists in the database
            Optional<Article> existingArticle = articleRepository.findByUrl(articleUrl);

            if (existingArticle.isEmpty()) {
                // Save new article
                Article newArticle = new Article(articleUrl, title, content, 0.0f, false);
                articleRepository.save(newArticle);
                System.out.println(articleUrl + "Added to database");
                
                response.add(articleUrl);
            } else {
                response.add(articleUrl);
            }
        }

        return response;
    }
}
