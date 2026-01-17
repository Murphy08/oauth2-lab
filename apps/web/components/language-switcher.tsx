'use client'

import { useLanguage } from './language-provider'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLocale('zh')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'zh'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        English
      </button>
    </div>
  )
}
