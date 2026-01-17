'use client'

import { useLanguage } from '@/components/language-provider'

export default function FlowsPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t.flows.title}</h1>

      <div className="space-y-8">
        <section className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t.flows.authCodeFlow.title}</h2>
          <p className="text-gray-600 mb-4">
            {t.flows.authCodeFlow.description}
          </p>
          <a
            href="/flows/authorization-code"
            className="text-blue-600 hover:underline"
          >
            {t.flows.viewDemo}
          </a>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t.flows.pkceFlow.title}</h2>
          <p className="text-gray-600 mb-4">
            {t.flows.pkceFlow.description}
          </p>
          <a
            href="/flows/pkce"
            className="text-blue-600 hover:underline"
          >
            {t.flows.viewDemo}
          </a>
        </section>
      </div>
    </div>
  )
}
