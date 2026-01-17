'use client'

import { useState } from 'react'

interface RequestLog {
  id: string
  method: string
  url: string
  timestamp: string
}

export default function RequestInterceptor() {
  const [logs, setLogs] = useState<RequestLog[]>([])

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Request/Response Logger</h3>
      <div className="space-y-2">
        {logs.length === 0 ? (
          <p className="text-gray-500">No requests logged yet</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="border-l-2 border-blue-500 pl-3 py-2">
              <div className="font-mono text-sm">
                {log.method} {log.url}
              </div>
              <div className="text-xs text-gray-500">{log.timestamp}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
