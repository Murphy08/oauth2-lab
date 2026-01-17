'use client'

import { useState } from 'react'

export default function RefreshTokenPage() {
  const [step, setStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: 'Step 1: Initial Token Response',
      description: 'Server returns access token and refresh token',
      code: '{\n  "access_token": "ACCESS_TOKEN",\n  "refresh_token": "REFRESH_TOKEN",\n  "token_type": "Bearer",\n  "expires_in": 3600\n}'
    },
    {
      id: 2,
      title: 'Step 2: Access Token Expires',
      description: 'Client detects expired access token',
      code: 'GET /api/resource\nAuthorization: Bearer EXPIRED_TOKEN\n\nResponse: 401 Unauthorized'
    },
    {
      id: 3,
      title: 'Step 3: Request New Access Token',
      description: 'Client uses refresh token to get new access token',
      code: 'POST /oauth/token\ngrant_type=refresh_token&\nrefresh_token=REFRESH_TOKEN&\nclient_id=CLIENT_ID&\nclient_secret=CLIENT_SECRET'
    },
    {
      id: 4,
      title: 'Step 4: New Token Response',
      description: 'Server returns new access token',
      code: '{\n  "access_token": "NEW_ACCESS_TOKEN",\n  "token_type": "Bearer",\n  "expires_in": 3600\n}'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Refresh Token Mechanism</h1>

      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`px-4 py-2 rounded ${
                step === s.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Step {s.id}
            </button>
          ))}
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">{steps[step - 1].title}</h2>
          <p className="text-gray-600 mb-4">{steps[step - 1].description}</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{steps[step - 1].code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

