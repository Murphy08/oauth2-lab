const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite3.Database(path.join(__dirname, '../data/oauth2.db'))

// Initialize database tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    secret TEXT NOT NULL,
    redirect_uris TEXT NOT NULL,
    grants TEXT NOT NULL
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS tokens (
    access_token TEXT PRIMARY KEY,
    access_token_expires_at DATETIME NOT NULL,
    client_id TEXT NOT NULL,
    user_id TEXT,
    scope TEXT
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`)
})

module.exports = db
