'use client'

import { useState, useEffect } from 'react'

interface LogEntry {
  id: string
  level: 'info' | 'warn' | 'error'
  message: string
  timestamp: string
}

export default function LogStream() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Real-time Logs</h3>
      <div className="bg-black text-green-400 p-4 rounded h-64 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-gray-500">Waiting for logs...</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="mb-1">
              <span className="text-gray-500">[{log.timestamp}]</span>{' '}
              <span className={
                log.level === 'error' ? 'text-red-400' :
                log.level === 'warn' ? 'text-yellow-400' : 'text-green-400'
              }>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
