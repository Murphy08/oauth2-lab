package com.oauth2lab.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class ClientController {

    @Value("${oauth2.client.client-id:test-client}")
    private String clientId;

    @Value("${oauth2.client.redirect-uri:http://localhost:3000/callback}")
    private String redirectUri;

    @GetMapping("/callback")
    public ModelAndView callback(
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String error,
            @RequestParam(required = false) String state) {

        Map<String, Object> model = new HashMap<>();

        if (error != null) {
            model.put("error", error);
            model.put("message", "Authorization failed");
        } else if (code != null) {
            model.put("code", code);
            model.put("state", state);
            model.put("message", "Authorization successful");
        }

        return new ModelAndView("callback", model);
    }

    @GetMapping("/client")
    public ModelAndView clientPage() {
        Map<String, Object> model = new HashMap<>();
        model.put("clientId", clientId);
        model.put("redirectUri", redirectUri);
        return new ModelAndView("client", model);
    }
}
