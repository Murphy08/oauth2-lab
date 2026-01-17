const express = require('express')
const axios = require('axios')
const router = express.Router()

const CLIENT_ID = process.env.OAUTH2_CLIENT_ID || 'test-client'
const CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET || 'test-secret'
const REDIRECT_URI = process.env.OAUTH2_REDIRECT_URI || 'http://localhost:3001/client/callback'
const AUTHORIZATION_ENDPOINT = 'http://localhost:3001/oauth/authorize'
const TOKEN_ENDPOINT = 'http://localhost:3001/oauth/token'

// Client home page
router.get('/', (req, res) => {
  const html = `
    <html>
      <head><title>OAuth2 Client</title></head>
      <body>
        <h1>OAuth2 Client Application</h1>
        <p>Client ID: ${CLIENT_ID}</p>
        <p>Redirect URI: ${REDIRECT_URI}</p>
        <a href="/client/login">Login with OAuth2</a>
      </body>
    </html>
  `
  res.send(html)
})

// Initiate OAuth2 flow
router.get('/login', (req, res) => {
  const authUrl = `${AUTHORIZATION_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=read write&state=random_state`
  res.redirect(authUrl)
})

// OAuth2 callback
router.get('/callback', async (req, res) => {
  const { code, state, error } = req.query

  if (error) {
    return res.send(`<h1>Error: ${error}</h1>`)
  }

  if (!code) {
    return res.send('<h1>Error: No authorization code received</h1>')
  }

  try {
    // Exchange code for token
    const response = await axios.post(TOKEN_ENDPOINT, new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    const tokenData = response.data
    const html = `
      <html>
        <head><title>OAuth2 Success</title></head>
        <body>
          <h1>Authorization Successful!</h1>
          <p>Access Token: ${tokenData.access_token}</p>
          <p>Token Type: ${tokenData.token_type}</p>
          <p>Expires In: ${tokenData.expires_in} seconds</p>
          <p>Refresh Token: ${tokenData.refresh_token}</p>
        </body>
      </html>
    `
    res.send(html)
  } catch (err) {
    res.send(`<h1>Error: ${err.message}</h1>`)
  }
})

module.exports = router
