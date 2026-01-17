const express = require('express')
const router = express.Router()
const { tokens } = require('./oauth')

// Token verification middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'missing_authorization_header' })
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'invalid_authorization_header' })
  }

  const token = authHeader.replace('Bearer ', '')

  if (!tokens.has(token)) {
    return res.status(401).json({ error: 'invalid_token' })
  }

  const tokenData = tokens.get(token)

  if (tokenData.expiresAt < Date.now()) {
    tokens.delete(token)
    return res.status(401).json({ error: 'token_expired' })
  }

  req.tokenData = tokenData
  next()
}

// User info endpoint
router.get('/userinfo', verifyToken, (req, res) => {
  res.json({
    user_id: req.tokenData.userId,
    client_id: req.tokenData.clientId,
    scope: req.tokenData.scope
  })
})

// Protected resource endpoint
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'This is a protected resource',
    timestamp: new Date().toISOString()
  })
})

module.exports = router
