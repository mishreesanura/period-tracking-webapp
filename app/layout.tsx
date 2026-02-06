import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { MainNavigation } from '@/components/main-navigation'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Cycle - Period Tracker & Journal',
  description: 'A calm, non-judgmental period tracker with emotional journaling. Track your cycle and reflect on your feelings.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <MainNavigation />
        {children}
      </body>
    </html>
  )
}
