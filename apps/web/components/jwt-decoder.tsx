'use client'

import { useState } from 'react'

export default function JWTDecoder() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<any>(null)

  const decodeToken = (jwt: string) => {
    try {
      const parts = jwt.split('.')
      if (parts.length !== 3) {
        setDecoded({ error: 'Invalid JWT format' })
        return
      }

      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))

      setDecoded({ header, payload })
    } catch (error) {
      setDecoded({ error: 'Failed to decode token' })
    }
  }

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">JWT Token Decoder</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => {
              setToken(e.target.value)
              decodeToken(e.target.value)
            }}
            className="w-full border rounded px-3 py-2 h-24"
            placeholder="Paste your JWT token here..."
          />
        </div>

        {decoded && (
          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(decoded, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
