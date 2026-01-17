'use client'

import { useState } from 'react'

export default function AuthorizationCodeFlowPage() {
  const [step, setStep] = useState(1)
  const [authCode, setAuthCode] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  // 模拟生成授权码
  const generateAuthCode = () => {
    const code = 'AUTH_' + Math.random().toString(36).substring(2, 15)
    setAuthCode(code)
    return code
  }

  // 模拟生成访问令牌
  const generateAccessToken = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + Math.random().toString(36).substring(2, 15)
    setAccessToken(token)
    return token
  }

  const steps = [
    {
      id: 1,
      title: 'Step 1: Authorization Request',
      description: 'Client redirects user to authorization server',
      code: 'GET /oauth/authorize?response_type=code&client_id=test-client&redirect_uri=http://localhost:3000/callback&scope=read&state=xyz123'
    },
    {
      id: 2,
      title: 'Step 2: User Authentication',
      description: 'User logs in and grants permission',
      code: 'User enters credentials and approves the request'
    },
    {
      id: 3,
      title: 'Step 3: Authorization Code',
      description: 'Server redirects back with authorization code',
      code: authCode
        ? `GET http://localhost:3000/callback?code=${authCode}&state=xyz123`
        : 'GET http://localhost:3000/callback?code=AUTH_CODE&state=xyz123'
    },
    {
      id: 4,
      title: 'Step 4: Token Exchange',
      description: 'Client exchanges code for access token',
      code: accessToken
        ? `POST /oauth/token\ngrant_type=authorization_code&code=${authCode}&redirect_uri=http://localhost:3000/callback&client_id=test-client&client_secret=test-secret\n\nResponse:\n{\n  "access_token": "${accessToken}",\n  "token_type": "Bearer",\n  "expires_in": 3600\n}`
        : 'POST /oauth/token\ngrant_type=authorization_code&code=AUTH_CODE&redirect_uri=http://localhost:3000/callback&client_id=test-client&client_secret=test-secret'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Authorization Code Flow</h1>

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

          {/* 交互式演示按钮 */}
          <div className="mt-4 flex gap-2">
            {step === 3 && !authCode && (
              <button
                onClick={() => {
                  generateAuthCode()
                  setShowDemo(true)
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                模拟生成授权码
              </button>
            )}
            {step === 4 && authCode && !accessToken && (
              <button
                onClick={generateAccessToken}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                模拟交换 Token
              </button>
            )}
            {(authCode || accessToken) && (
              <button
                onClick={() => {
                  setAuthCode('')
                  setAccessToken('')
                  setShowDemo(false)
                  setStep(1)
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                重置演示
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 提示信息 */}
      {showDemo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 提示</h3>
          <p className="text-blue-800">
            这是一个交互式演示。点击"模拟生成授权码"按钮可以看到实际的 redirect_uri 中包含的授权码值。
            然后在 Step 4 中可以看到如何使用这个授权码交换访问令牌。
          </p>
        </div>
      )}
    </div>
  )
}
