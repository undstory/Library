import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'



export const metadata: Metadata = {
  title: 'Biblioteczka',
  description: 'Aplikacja do zarządzania czytaniem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
      <body>{children}</body>
      </AuthProvider>
    </html>
  )
}
