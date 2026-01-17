'use client'

import { useState } from 'react'

export default function PKCEFlowPage() {
  const [step, setStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: 'Step 1: Generate Code Verifier & Challenge',
      description: 'Client generates random code verifier and creates challenge',
      code: 'code_verifier = random_string(43-128 chars)\ncode_challenge = BASE64URL(SHA256(code_verifier))'
    },
    {
      id: 2,
      title: 'Step 2: Authorization Request with PKCE',
      description: 'Client redirects with code challenge',
      code: 'GET /oauth/authorize?\n  response_type=code&\n  client_id=CLIENT_ID&\n  redirect_uri=CALLBACK_URL&\n  code_challenge=CHALLENGE&\n  code_challenge_method=S256'
    },
    {
      id: 3,
      title: 'Step 3: User Authentication',
      description: 'User logs in and grants permission',
      code: 'User enters credentials and approves'
    },
    {
      id: 4,
      title: 'Step 4: Authorization Code',
      description: 'Server redirects with code',
      code: 'GET /callback?code=AUTH_CODE'
    },
    {
      id: 5,
      title: 'Step 5: Token Exchange with Verifier',
      description: 'Client sends code verifier to prove identity',
      code: 'POST /oauth/token\ngrant_type=authorization_code&\ncode=AUTH_CODE&\nredirect_uri=CALLBACK_URL&\nclient_id=CLIENT_ID&\ncode_verifier=VERIFIER'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">PKCE Flow</h1>
      <p className="text-gray-600 mb-8">
        Proof Key for Code Exchange - Enhanced security for mobile and SPA applications
      </p>

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

