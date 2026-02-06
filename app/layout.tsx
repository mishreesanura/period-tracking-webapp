import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Sans } from 'next/font/google'

import './globals.css'
import { MainNavigation } from '@/components/main-navigation'

const _geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const _geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument' })

export const metadata: Metadata = {
  title: 'ऋतु - Period Tracker & Journal',
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
      <body className={`${_geist.variable} ${instrumentSans.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <MainNavigation />
        {children}
      </body>
    </html>
  )
}
