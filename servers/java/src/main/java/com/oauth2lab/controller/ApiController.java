package com.oauth2lab.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/userinfo")
    public Map<String, Object> userInfo(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        response.put("username", authentication.getName());
        response.put("authorities", authentication.getAuthorities());
        return response;
    }

    @GetMapping("/protected")
    public Map<String, String> protectedResource() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a protected resource");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        return response;
    }
}
