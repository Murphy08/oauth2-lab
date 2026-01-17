'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/language-provider'

interface ServerStatus {
  name: string
  port: number
  status: 'running' | 'stopped' | 'error'
  language: string
}

export default function ServersPage() {
  const { t } = useLanguage()
  const [servers, setServers] = useState<ServerStatus[]>([
    { name: 'Java Server', port: 8080, status: 'stopped', language: 'Java' },
    { name: 'Python Server', port: 8000, status: 'stopped', language: 'Python' },
    { name: 'Node.js Server', port: 3001, status: 'stopped', language: 'Node.js' },
    { name: 'PHP Server', port: 8888, status: 'stopped', language: 'PHP' },
    { name: 'Go Server', port: 9000, status: 'stopped', language: 'Go' },
  ])

  useEffect(() => {
    checkAllServers()
  }, [])

  const checkAllServers = async () => {
    const updatedServers = await Promise.all(
      servers.map(async (server) => {
        try {
          const response = await fetch(`http://localhost:${server.port}/health`, {
            method: 'GET',
            signal: AbortSignal.timeout(3000)
          })
          return {
            ...server,
            status: response.ok ? 'running' as const : 'stopped' as const
          }
        } catch (error) {
          return {
            ...server,
            status: 'stopped' as const
          }
        }
      })
    )
    setServers(updatedServers)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{t.servers.title}</h1>
        <button
          onClick={checkAllServers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t.servers.checkStatus}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <div key={server.name} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{server.name}</h3>
                <p className="text-gray-600">{t.servers.port}: {server.port}</p>
              </div>
              <span
                className={`px-3 py-1 rounded text-sm ${
                  server.status === 'running'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {server.status === 'running' ? t.servers.running : t.servers.stopped}
              </span>
            </div>
            <a
              href={`/servers/${server.language.toLowerCase()}`}
              className="block w-full px-4 py-2 bg-gray-100 text-center rounded hover:bg-gray-200"
            >
              {t.servers.serverInfo}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
