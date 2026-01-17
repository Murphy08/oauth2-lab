'use client'

import Link from 'next/link'
import LanguageSwitcher from './language-switcher'
import { useLanguage } from './language-provider'

export default function Navbar() {
  const { t } = useLanguage()
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">OAuth 2.0 Lab</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/flows"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                {t.nav.flows}
              </Link>
              <Link
                href="/servers"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                {t.nav.servers}
              </Link>
              <Link
                href="/security"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                {t.nav.security}
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                {t.nav.compare}
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                {t.nav.docs}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
