package com.example.newsapi.service;

import com.example.newsapi.config.NewsApiConfig;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class NewsService {

    private final RestTemplate restTemplate;
    private final NewsApiConfig newsApiConfig;

    public NewsService(RestTemplate restTemplate, NewsApiConfig newsApiConfig) {
        this.restTemplate = restTemplate;
        this.newsApiConfig = newsApiConfig;
    }

    public Map<String, Object> searchArticles(String query) {
        String url = String.format("%s?q=%s&apiKey=%s", newsApiConfig.getNewsApiUrl(), query, newsApiConfig.getApiKey());
        return restTemplate.getForObject(url, Map.class);
    }
}