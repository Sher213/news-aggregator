package com.example.demo.controller;

import com.example.demo.model.Greeting;
import com.example.demo.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @Autowired
    private DemoService demoService;

    @GetMapping("/greet")
    public Greeting greet(@RequestParam(defaultValue = "World") String name) {
        return demoService.getGreeting(name);
    }
}