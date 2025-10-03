// src/app/layout.tsx
// Root Layout

import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ikonmedlab - Tıbbi Sistemler',
  description: 'Tıbbi sistemler ve laboratuvar ekipmanları konusunda güvenilir çözüm ortağınız.',
  icons: {
    icon: '/favicon.png',  // veya '/favicon.png'
    shortcut: '/favicon.png', // opsiyonel
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}