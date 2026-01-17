const request = require('supertest')
const express = require('express')

// Mock app for testing
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'nodejs-oauth2-server' })
})

describe('Health Check', () => {
  test('GET /health should return ok status', async () => {
    const response = await request(app).get('/health')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      status: 'ok',
      service: 'nodejs-oauth2-server'
    })
  })
})
