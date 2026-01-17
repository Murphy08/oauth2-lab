<?php

require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OAuth2Lab\Controllers\OAuthController;

$app = AppFactory::create();

// Add error middleware
$app->addErrorMiddleware(true, true, true);

// OAuth routes
$oauthController = new OAuthController();
$app->get('/oauth/authorize', [$oauthController, 'authorize']);
$app->post('/oauth/token', [$oauthController, 'token']);

// Health check endpoint
$app->get('/health', function (Request $request, Response $response) {
    $data = [
        'status' => 'ok',
        'service' => 'php-oauth2-server'
    ];
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
