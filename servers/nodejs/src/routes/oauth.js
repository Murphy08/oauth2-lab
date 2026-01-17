const express = require('express')
const crypto = require('crypto')
const router = express.Router()

// In-memory storage
const authorizationCodes = new Map()
const tokens = new Map()
const clients = {
  'test-client': {
    clientSecret: 'test-secret',
    redirectUris: ['http://localhost:3000/callback', 'http://127.0.0.1:3000/callback'],
    grants: ['authorization_code', 'refresh_token', 'client_credentials'],
    scopes: ['read', 'write', 'openid']
  }
}

// Authorization endpoint
router.get('/authorize', (req, res) => {
  const { response_type, client_id, redirect_uri, scope, state } = req.query

  if (response_type !== 'code') {
    return res.status(400).json({ error: 'unsupported_response_type' })
  }

  if (!clients[client_id]) {
    return res.status(400).json({ error: 'invalid_client' })
  }

  if (!clients[client_id].redirectUris.includes(redirect_uri)) {
    return res.status(400).json({ error: 'invalid_redirect_uri' })
  }

  // Generate authorization code
  const code = crypto.randomBytes(32).toString('base64url')
  authorizationCodes.set(code, {
    clientId: client_id,
    redirectUri: redirect_uri,
    scope: scope || '',
    userId: 'user123', // Mock user
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  })

  // Redirect back with code
  const redirectUrl = new URL(redirect_uri)
  redirectUrl.searchParams.set('code', code)
  if (state) redirectUrl.searchParams.set('state', state)

  res.redirect(redirectUrl.toString())
})

// Token endpoint
router.post('/token', (req, res) => {
  const { grant_type, code, client_id, client_secret, redirect_uri, refresh_token } = req.body

  // Validate client credentials
  if (!clients[client_id] || clients[client_id].clientSecret !== client_secret) {
    return res.status(401).json({ error: 'invalid_client' })
  }

  if (grant_type === 'authorization_code') {
    if (!code || !authorizationCodes.has(code)) {
      return res.status(400).json({ error: 'invalid_grant' })
    }

    const authCode = authorizationCodes.get(code)

    // Validate code
    if (authCode.expiresAt < Date.now()) {
      authorizationCodes.delete(code)
      return res.status(400).json({ error: 'invalid_grant' })
    }

    if (authCode.clientId !== client_id) {
      return res.status(400).json({ error: 'invalid_grant' })
    }

    if (authCode.redirectUri !== redirect_uri) {
      return res.status(400).json({ error: 'invalid_grant' })
    }

    // Generate tokens
    const accessToken = crypto.randomBytes(32).toString('base64url')
    const refreshToken = crypto.randomBytes(32).toString('base64url')

    tokens.set(accessToken, {
      clientId: client_id,
      userId: authCode.userId,
      scope: authCode.scope,
      expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
    })

    tokens.set(refreshToken, {
      clientId: client_id,
      userId: authCode.userId,
      scope: authCode.scope,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // Delete used authorization code
    authorizationCodes.delete(code)

    return res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: refreshToken,
      scope: authCode.scope
    })
  }

  if (grant_type === 'client_credentials') {
    const accessToken = crypto.randomBytes(32).toString('base64url')

    tokens.set(accessToken, {
      clientId: client_id,
      userId: null,
      scope: 'read write',
      expiresAt: Date.now() + 60 * 60 * 1000
    })

    return res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'read write'
    })
  }

  if (grant_type === 'refresh_token') {
    if (!refresh_token || !tokens.has(refresh_token)) {
      return res.status(400).json({ error: 'invalid_grant' })
    }

    const tokenData = tokens.get(refresh_token)

    if (tokenData.expiresAt < Date.now()) {
      tokens.delete(refresh_token)
      return res.status(400).json({ error: 'invalid_grant' })
    }

    const accessToken = crypto.randomBytes(32).toString('base64url')

    tokens.set(accessToken, {
      clientId: client_id,
      userId: tokenData.userId,
      scope: tokenData.scope,
      expiresAt: Date.now() + 60 * 60 * 1000
    })

    return res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: tokenData.scope
    })
  }

  return res.status(400).json({ error: 'unsupported_grant_type' })
})

module.exports = router
module.exports.tokens = tokens
