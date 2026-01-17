const db = require('./db')

const model = {
  getClient: (clientId, clientSecret) => {
    return new Promise((resolve, reject) => {
      const query = clientSecret
        ? 'SELECT * FROM clients WHERE id = ? AND secret = ?'
        : 'SELECT * FROM clients WHERE id = ?'

      const params = clientSecret ? [clientId, clientSecret] : [clientId]

      db.get(query, params, (err, row) => {
        if (err) return reject(err)
        if (!row) return resolve(null)

        resolve({
          id: row.id,
          clientSecret: row.secret,
          redirectUris: JSON.parse(row.redirect_uris),
          grants: JSON.parse(row.grants)
        })
      })
    })
  },

  saveToken: (token, client, user) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO tokens (access_token, access_token_expires_at, client_id, user_id, scope)
                     VALUES (?, ?, ?, ?, ?)`

      db.run(query, [
        token.accessToken,
        token.accessTokenExpiresAt,
        client.id,
        user ? user.id : null,
        token.scope
      ], (err) => {
        if (err) return reject(err)
        resolve({
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          client: client,
          user: user
        })
      })
    })
  }
}

module.exports = model
