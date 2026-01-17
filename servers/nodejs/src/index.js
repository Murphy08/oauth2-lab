require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const oauthRouter = require('./routes/oauth')
const apiRouter = require('./routes/api')
const clientRouter = require('./routes/client')

const app = express()
const PORT = process.env.NODEJS_SERVER_PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET || 'oauth2-lab-secret',
  resave: false,
  saveUninitialized: false
}))

// Routes
app.use('/oauth', oauthRouter)
app.use('/api', apiRouter)
app.use('/client', clientRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'nodejs-oauth2-server' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Node.js OAuth2 Server running on port ${PORT}`)
})
