<?php

namespace OAuth2Lab\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class OAuthController
{
    private array $authorizationCodes = [];
    private array $tokens = [];
    private array $clients = [
        'test-client' => [
            'client_secret' => 'test-secret',
            'redirect_uris' => ['http://localhost:3000/callback', 'http://127.0.0.1:3000/callback'],
            'grants' => ['authorization_code', 'refresh_token', 'client_credentials'],
            'scopes' => ['read', 'write', 'openid']
        ]
    ];

    public function authorize(Request $request, Response $response): Response
    {
        $params = $request->getQueryParams();
        $responseType = $params['response_type'] ?? '';
        $clientId = $params['client_id'] ?? '';
        $redirectUri = $params['redirect_uri'] ?? '';
        $scope = $params['scope'] ?? '';
        $state = $params['state'] ?? '';

        if ($responseType !== 'code') {
            $response->getBody()->write(json_encode(['error' => 'unsupported_response_type']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        if (!isset($this->clients[$clientId])) {
            $response->getBody()->write(json_encode(['error' => 'invalid_client']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        if (!in_array($redirectUri, $this->clients[$clientId]['redirect_uris'])) {
            $response->getBody()->write(json_encode(['error' => 'invalid_redirect_uri']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        // Generate authorization code
        $code = bin2hex(random_bytes(32));
        $this->authorizationCodes[$code] = [
            'client_id' => $clientId,
            'redirect_uri' => $redirectUri,
            'scope' => $scope,
            'user_id' => 'user123',
            'expires_at' => time() + 600
        ];

        // Redirect back with code
        $redirectUrl = $redirectUri . '?code=' . $code;
        if ($state) {
            $redirectUrl .= '&state=' . $state;
        }

        return $response->withHeader('Location', $redirectUrl)->withStatus(302);
    }

    public function token(Request $request, Response $response): Response
    {
        $params = $request->getParsedBody();
        $grantType = $params['grant_type'] ?? '';
        $code = $params['code'] ?? '';
        $clientId = $params['client_id'] ?? '';
        $clientSecret = $params['client_secret'] ?? '';
        $redirectUri = $params['redirect_uri'] ?? '';

        // Validate client credentials
        if (!isset($this->clients[$clientId]) || $this->clients[$clientId]['client_secret'] !== $clientSecret) {
            $response->getBody()->write(json_encode(['error' => 'invalid_client']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        if ($grantType === 'authorization_code') {
            if (!isset($this->authorizationCodes[$code])) {
                $response->getBody()->write(json_encode(['error' => 'invalid_grant']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }

            $authCode = $this->authorizationCodes[$code];

            if ($authCode['expires_at'] < time()) {
                unset($this->authorizationCodes[$code]);
                $response->getBody()->write(json_encode(['error' => 'invalid_grant']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }

            // Generate tokens
            $accessToken = bin2hex(random_bytes(32));
            $refreshToken = bin2hex(random_bytes(32));

            $this->tokens[$accessToken] = [
                'client_id' => $clientId,
                'user_id' => $authCode['user_id'],
                'scope' => $authCode['scope'],
                'expires_at' => time() + 3600
            ];

            unset($this->authorizationCodes[$code]);

            $data = [
                'access_token' => $accessToken,
                'token_type' => 'Bearer',
                'expires_in' => 3600,
                'refresh_token' => $refreshToken,
                'scope' => $authCode['scope']
            ];

            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode(['error' => 'unsupported_grant_type']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }
}
