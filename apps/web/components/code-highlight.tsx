'use client'

interface CodeHighlightProps {
  code: string
  language: string
}

export default function CodeHighlight({ code, language }: CodeHighlightProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">{language}</span>
        <button className="text-sm text-blue-600 hover:underline">
          Copy
        </button>
      </div>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  )
}
