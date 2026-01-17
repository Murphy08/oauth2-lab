'use client'

import { useState } from 'react'

export default function ClientCredentialsFlowPage() {
  const [step, setStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: 'Step 1: Client Authentication',
      description: 'Client sends credentials to token endpoint',
      code: 'POST /oauth/token\ngrant_type=client_credentials&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&scope=read'
    },
    {
      id: 2,
      title: 'Step 2: Token Response',
      description: 'Server returns access token',
      code: '{\n  "access_token": "ACCESS_TOKEN",\n  "token_type": "Bearer",\n  "expires_in": 3600,\n  "scope": "read"\n}'
    },
    {
      id: 3,
      title: 'Step 3: Access Protected Resource',
      description: 'Client uses token to access API',
      code: 'GET /api/resource\nAuthorization: Bearer ACCESS_TOKEN'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Client Credentials Flow</h1>

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
