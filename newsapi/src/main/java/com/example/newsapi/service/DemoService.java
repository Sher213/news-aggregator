package com.example.demo.service;

import com.example.demo.model.Greeting;
import org.springframework.stereotype.Service;

@Service
public class DemoService {

    public Greeting getGreeting(String name) {
        String message = "Hello, " + name + "!";
        return new Greeting(message);
    }
}