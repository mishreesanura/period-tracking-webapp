'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Settings, X } from 'lucide-react'
import { MovementCard } from '@/components/movement-card'
import { MovementPreferencesSettings } from '@/components/movement-preferences'
import { calculateCyclePhase } from '@/lib/cycle-utils'
import { getSuggestedMovements, getMovementDescription } from '@/lib/movement-utils'
import type { MovementPreferences } from '@/lib/movement-types'

const phaseColors: Record<string, string> = {
  period: 'bg-red-100 text-red-900 border-red-300',
  follicular: 'bg-green-100 text-green-900 border-green-300',
  ovulation: 'bg-yellow-100 text-yellow-900 border-yellow-300',
  'luteal-pms': 'bg-purple-100 text-purple-900 border-purple-300',
}

const phaseEmojis: Record<string, string> = {
  period: '🩸',
  follicular: '🌱',
  ovulation: '⚡',
  'luteal-pms': '🌙',
}

export default function MovementPage() {
  const [cycleStartDate, setCycleStartDate] = useState<Date | null>(null)
  const [preferences, setPreferences] = useState<MovementPreferences | null>(null)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cycleStartDate')
    if (saved) {
      setCycleStartDate(new Date(saved))
    }
    const savedPrefs = localStorage.getItem('movementPreferences')
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs))
    }
  }, [])

  if (!cycleStartDate) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            aria-label="Back to home"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Movement Guide
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Start by tracking your cycle to see personalized movement suggestions tailored to your body's needs.
            </p>
            <Link
              href="/calendar"
              className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              aria-label="Navigate to calendar to track your cycle"
            >
              Go to Calendar
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const cycleData = calculateCyclePhase(new Date(), cycleStartDate)
  const suggestedMovements = getSuggestedMovements(
    cycleData.phase,
    preferences || undefined
  )
  const description = getMovementDescription(cycleData.phase)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to home"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label={showPreferences ? 'Close preferences' : 'Open preferences'}
            aria-expanded={showPreferences}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-sm font-medium">Preferences</span>
          </button>
        </div>

        {/* Preferences Modal - Accessible Drawer */}
        {showPreferences && (
          <div 
            className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm"
            role="region"
            aria-label="Movement preferences"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Movement Preferences
              </h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                aria-label="Close preferences"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <MovementPreferencesSettings
              onSave={(prefs) => {
                setPreferences(prefs)
                setShowPreferences(false)
              }}
              onClose={() => setShowPreferences(false)}
            />
          </div>
        )}

        {/* Cycle Phase Indicator */}
        <div className="mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${phaseColors[cycleData.phase]}`}>
            <span className="text-lg">{phaseEmojis[cycleData.phase]}</span>
            <span className="font-semibold capitalize">
              {cycleData.phase.replace('-', ' ')} Phase
            </span>
            <span className="text-sm opacity-75">Day {cycleData.cycleDay}</span>
          </div>
        </div>

        {/* Page Title & Description */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Movement Guide
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Movements Grid */}
        <div className="space-y-4">
          {suggestedMovements.length > 0 ? (
            <>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {suggestedMovements.length} Suggestions for today
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedMovements.map((movement) => (
                  <MovementCard
                    key={movement.id}
                    movement={movement}
                    reason={`Perfect for your ${cycleData.phase} phase`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
              <p className="text-muted-foreground mb-4">
                No movements available for your current preferences.
              </p>
              <button
                onClick={() => setShowPreferences(true)}
                className="text-sm text-primary hover:underline font-medium"
              >
                Try adjusting your preferences
              </button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            How to use this guide
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">→</span>
              <span>Click on any movement card to see detailed exercises and modifications</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">→</span>
              <span>Adjust your preferences anytime if you want different movement types</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">→</span>
              <span>Movement suggestions change based on your cycle phase</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">→</span>
              <span>Not feeling it? Every movement has a gentle alternative</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
