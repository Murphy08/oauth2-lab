'use client'

import { useLanguage } from '@/components/language-provider'

export default function DocsPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t.docs.title}</h1>

      <div className="space-y-6">
        <section className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t.docs.gettingStarted.title}</h2>
          <p className="text-gray-600 mb-4">
            {t.docs.gettingStarted.description}
          </p>
          <a href="/docs/getting-started" className="text-blue-600 hover:underline">
            {t.docs.gettingStarted.startTutorial}
          </a>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t.docs.fundamentals.title}</h2>
          <p className="text-gray-600 mb-4">
            {t.docs.fundamentals.description}
          </p>
          <a href="/docs/fundamentals" className="text-blue-600 hover:underline">
            {t.docs.gettingStarted.startTutorial}
          </a>
        </section>
      </div>
    </div>
  )
}
