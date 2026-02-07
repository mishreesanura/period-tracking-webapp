import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Sans } from 'next/font/google'

import './globals.css'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'

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
      <body className={`${_geist.variable} ${instrumentSans.variable} font-sans antialiased bg-gradient-to-br from-[#F3E8FF] to-[#FCE7F3] min-h-screen bg-fixed text-foreground`} suppressHydrationWarning>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="min-h-screen">
              <div className="flex h-16 items-center gap-2 px-4 border-b border-border md:hidden bg-white/50 backdrop-blur sticky top-0 z-10 w-full">
                 <SidebarTrigger />
                 <span className="font-bold text-lg">ऋतु</span>
              </div>
              <div className="hidden md:block absolute top-3 left-3 z-50">
                <SidebarTrigger className="opacity-0 group-hover/sidebar-wrapper:opacity-100 transition-opacity" />
              </div>

              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
