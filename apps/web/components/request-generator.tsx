'use client'

import { useState } from 'react'

export default function RequestGenerator() {
  const [grantType, setGrantType] = useState('authorization_code')
  const [clientId, setClientId] = useState('')
  const [redirectUri, setRedirectUri] = useState('')

  const generateRequest = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'read write'
    })
    return `/oauth/authorize?${params.toString()}`
  }

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">OAuth 2.0 Request Generator</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Client ID</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="your-client-id"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Redirect URI</label>
          <input
            type="text"
            value={redirectUri}
            onChange={(e) => setRedirectUri(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="http://localhost:3000/callback"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm font-mono break-all">{generateRequest()}</p>
        </div>
      </div>
    </div>
  )
}
