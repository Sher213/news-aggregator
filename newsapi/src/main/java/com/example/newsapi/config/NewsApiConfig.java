package com.example.newsapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class NewsApiConfig {
    @Value("${newsapi.url}")
    private String newsApiUrl;

    @Value("${newsapi.key}")
    private String apiKey;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    public String getNewsApiUrl() {
        return newsApiUrl;
    }

    public String getApiKey() {
        return apiKey;
    }
}