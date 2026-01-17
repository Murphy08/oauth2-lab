'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/language-provider'

interface SecurityIssue {
  id: string
  severity: 'high' | 'medium' | 'low'
  title: string
  description: string
  recommendation?: string
}

interface ScanResult {
  score: number
  issues: SecurityIssue[]
  timestamp: string
}

export default function SecurityPage() {
  const { t } = useLanguage()
  const [targetUrl, setTargetUrl] = useState('http://localhost:8080')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [score, setScore] = useState(0)
  const [issues, setIssues] = useState<SecurityIssue[]>([])

  const runScan = async () => {
    setIsScanning(true)
    try {
      // 模拟扫描过程
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockResult: ScanResult = {
        score: 75,
        timestamp: new Date().toISOString(),
        issues: [
          {
            id: '1',
            severity: 'high',
            title: 'Missing PKCE Implementation',
            description: 'PKCE is not implemented for public clients',
            recommendation: 'Implement PKCE (Proof Key for Code Exchange) for all public clients to prevent authorization code interception attacks.'
          },
          {
            id: '2',
            severity: 'medium',
            title: 'Token Expiration Too Long',
            description: 'Access tokens expire after 24 hours',
            recommendation: 'Reduce access token expiration time to 1 hour or less. Use refresh tokens for long-lived sessions.'
          },
          {
            id: '3',
            severity: 'high',
            title: 'Missing State Parameter',
            description: 'State parameter is not validated in authorization flow',
            recommendation: 'Always include and validate the state parameter to prevent CSRF attacks.'
          },
          {
            id: '4',
            severity: 'low',
            title: 'HTTPS Not Enforced',
            description: 'Server accepts HTTP connections',
            recommendation: 'Enforce HTTPS for all OAuth 2.0 endpoints to protect tokens in transit.'
          }
        ]
      }

      setScanResult(mockResult)
      setScore(mockResult.score)
      setIssues(mockResult.issues)
    } catch (error) {
      console.error('Scan failed:', error)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t.security.dashboard}</h1>

      {/* Scan Input */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t.security.runScan}</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder={t.security.enterUrl}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={runScan}
            disabled={isScanning}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isScanning ? t.security.scanning : t.security.runScan}
          </button>
        </div>
      </div>

      {/* Security Score */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t.security.score}</h2>
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold">{score}</div>
          <div className="text-gray-600">/ 100</div>
        </div>
      </div>

      {/* Issues List */}
      {issues.length > 0 && (
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t.security.issues} ({issues.length})
          </h2>
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`border-l-4 pl-4 py-3 ${
                  issue.severity === 'high' ? 'border-red-500' :
                  issue.severity === 'medium' ? 'border-yellow-500' :
                  'border-blue-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                    issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {issue.severity === 'high' ? t.security.high :
                     issue.severity === 'medium' ? t.security.medium :
                     t.security.low}
                  </span>
                  <h3 className="font-semibold">{issue.title}</h3>
                </div>
                <p className="text-gray-600 mb-2">{issue.description}</p>
                {issue.recommendation && (
                  <div className="mt-2 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">{t.security.recommendation} </span>
                      {issue.recommendation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!isScanning && issues.length === 0 && (
        <div className="border rounded-lg p-12 text-center text-gray-500">
          <p className="text-lg">{t.security.noResults}</p>
        </div>
      )}
    </div>
  )
}
