'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/language-provider'

export default function ComparePage() {
  const { t } = useLanguage()
  const [selectedLanguages, setSelectedLanguages] = useState(['java', 'python'])

  const codeExamples = {
    java: `// Java - Spring Boot
@RestController
@RequestMapping("/oauth")
public class OAuth2Controller {

    @PostMapping("/token")
    public ResponseEntity<TokenResponse> token(
        @RequestParam String grant_type,
        @RequestParam String code
    ) {
        // Token generation logic
        return ResponseEntity.ok(tokenResponse);
    }
}`,
    python: `# Python - FastAPI
from fastapi import FastAPI, Form

app = FastAPI()

@app.post("/oauth/token")
async def token(
    grant_type: str = Form(...),
    code: str = Form(...)
):
    # Token generation logic
    return {"access_token": token}`,
    nodejs: `// Node.js - Express
const express = require('express');
const router = express.Router();

router.post('/oauth/token', async (req, res) => {
    const { grant_type, code } = req.body;

    // Token generation logic
    res.json({ access_token: token });
});

module.exports = router;`,
    php: `<?php
// PHP - Slim Framework
use Psr\\Http\\Message\\ResponseInterface as Response;
use Psr\\Http\\Message\\ServerRequestInterface as Request;

$app->post('/oauth/token', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $grantType = $data['grant_type'];
    $code = $data['code'];

    // Token generation logic
    $response->getBody()->write(json_encode([
        'access_token' => $token
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});`,
    go: `// Go - Gin Framework
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func tokenHandler(c *gin.Context) {
    grantType := c.PostForm("grant_type")
    code := c.PostForm("code")

    // Token generation logic
    c.JSON(http.StatusOK, gin.H{
        "access_token": token,
    })
}

func main() {
    r := gin.Default()
    r.POST("/oauth/token", tokenHandler)
    r.Run()
}`
  }

  const languages = [
    { key: 'java', name: 'Java' },
    { key: 'python', name: 'Python' },
    { key: 'nodejs', name: 'Node.js' },
    { key: 'php', name: 'PHP' },
    { key: 'go', name: 'Go' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t.compare.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map(lang => (
          <div key={lang.key} className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{lang.name}</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              <code>{codeExamples[lang.key as keyof typeof codeExamples]}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
