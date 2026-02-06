'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Settings } from 'lucide-react'
import { HydrationLogger } from '@/components/hydration-logger'
import { HydrationPreferencesSettings } from '@/components/hydration-preferences'
import { HydrationInfo } from '@/components/hydration-info'
import type { HydrationEntry } from '@/lib/hydration-types'

export default function HydrationPage() {
  const [todayEntries, setTodayEntries] = useState<HydrationEntry[]>([])
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    const loadTodayEntries = () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('hydrationEntries')
        if (saved) {
          const allEntries: HydrationEntry[] = JSON.parse(saved)
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          const filteredEntries = allEntries.filter((entry) => {
            const entryDate = new Date(entry.timestamp)
            entryDate.setHours(0, 0, 0, 0)
            return entryDate.getTime() === today.getTime()
          })

          setTodayEntries(filteredEntries)
        }
      }
    }

    loadTodayEntries()
  }, [])

  const handleLogWater = (amount: 'half' | 'full') => {
    const newEntry: HydrationEntry = {
      id: `${Date.now()}`,
      timestamp: new Date(),
      amount,
    }

    setTodayEntries((prev) => [...prev, newEntry])

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hydrationEntries') || '[]'
      const allEntries = JSON.parse(saved)
      allEntries.push(newEntry)
      localStorage.setItem('hydrationEntries', JSON.stringify(allEntries))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-sm font-medium">Settings</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-2">Hydration</h1>
        <p className="text-muted-foreground mb-8">
          Gentle hydration support. No pressure, no goals—just care.
        </p>

        {/* Preferences Modal */}
        {showPreferences && (
          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <HydrationPreferencesSettings
              onSave={() => setShowPreferences(false)}
              onClose={() => setShowPreferences(false)}
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <HydrationLogger
              todayEntries={todayEntries}
              onLogWater={handleLogWater}
            />
          </div>

          <div>
            <HydrationInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
