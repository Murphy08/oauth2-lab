'use client'

import FeatureCard from '@/components/feature-card'
import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'

export default function Home() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t.home.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.home.description}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/flows"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {t.home.getStarted}
            </Link>
            <Link
              href="/docs"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              {t.home.learnMore}
            </Link>
          </div>
        </div>
      </section>

      {/* Language Implementations */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Multi-Language Implementations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Java"
              description="Spring Boot + Spring Security OAuth2"
              href="/servers/java"
            />
            <FeatureCard
              title="Python"
              description="FastAPI + Authlib"
              href="/servers/python"
            />
            <FeatureCard
              title="Node.js"
              description="Express + OAuth2 Server"
              href="/servers/nodejs"
            />
            <FeatureCard
              title="PHP"
              description="Laravel + Passport"
              href="/servers/php"
            />
            <FeatureCard
              title="Go"
              description="Gin + go-oauth2"
              href="/servers/go"
            />
            <FeatureCard
              title="Security Scanner"
              description="Automated vulnerability detection"
              href="/security"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
