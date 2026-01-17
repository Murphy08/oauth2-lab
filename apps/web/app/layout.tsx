import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import { LanguageProvider } from '@/components/language-provider'

export const metadata: Metadata = {
  title: 'OAuth 2.0 Lab',
  description: 'OAuth 2.0 Multi-Language Learning Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
