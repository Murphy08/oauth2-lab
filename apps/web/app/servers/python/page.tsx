'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'

export default function PythonServerPage() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<'running' | 'stopped' | 'checking'>('checking')
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    checkServerStatus()
  }, [])

  const checkServerStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/health')
      if (response.ok) {
        setStatus('running')
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Server is running`])
      } else {
        setStatus('stopped')
      }
    } catch (error) {
      setStatus('stopped')
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Server is not responding`])
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/servers" className="text-blue-600 hover:underline">
          {t.servers.backToServers}
        </Link>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Python OAuth2 Server</h1>
          <p className="text-gray-600">FastAPI + Authlib + SQLAlchemy</p>
        </div>
        <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
          status === 'running' ? 'bg-green-100 text-green-800' :
          status === 'stopped' ? 'bg-gray-100 text-gray-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status === 'running' ? `● ${t.servers.running}` : status === 'stopped' ? `○ ${t.servers.stopped}` : `⟳ ${t.servers.checking}`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t.servers.serverInfo}</h2>
          <dl className="space-y-2">
            <div className="flex justify-between"><dt className="text-gray-600">{t.servers.port}:</dt><dd className="font-medium">8000</dd></div>
            <div className="flex justify-between"><dt className="text-gray-600">{t.servers.framework}:</dt><dd className="font-medium">FastAPI</dd></div>
            <div className="flex justify-between"><dt className="text-gray-600">{t.servers.oauthLibrary}:</dt><dd className="font-medium">Authlib</dd></div>
            <div className="flex justify-between"><dt className="text-gray-600">{t.servers.database}:</dt><dd className="font-medium">SQLite</dd></div>
          </dl>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t.servers.quickActions}</h2>
          <div className="space-y-3">
            <button onClick={checkServerStatus} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{t.servers.checkStatus}</button>
            <a href="http://localhost:8000/health" target="_blank" rel="noopener noreferrer" className="block w-full px-4 py-2 bg-gray-100 text-center rounded hover:bg-gray-200">{t.servers.openHealth}</a>
            <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="block w-full px-4 py-2 bg-gray-100 text-center rounded hover:bg-gray-200">{t.servers.apiDocs}</a>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t.servers.endpoints}</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded"><span className="font-mono text-sm">GET /oauth/authorize</span><span className="text-gray-600">{t.servers.authEndpoint}</span></div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded"><span className="font-mono text-sm">POST /oauth/token</span><span className="text-gray-600">{t.servers.tokenEndpoint}</span></div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded"><span className="font-mono text-sm">GET /api/userinfo</span><span className="text-gray-600">{t.servers.userInfoEndpoint}</span></div>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t.servers.serverLogs}</h2>
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
          {logs.length > 0 ? logs.map((log, index) => <div key={index}>{log}</div>) : <div className="text-gray-500">{t.servers.noLogs}</div>}
        </div>
      </div>
    </div>
  )
}

