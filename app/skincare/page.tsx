'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Settings } from 'lucide-react'
import { calculateCyclePhase } from '@/lib/cycle-utils'
import { mapCyclePhaseToSkincare, getPhaseRoutines } from '@/lib/skincare-utils'
import type { SkincareCyclePhase } from '@/lib/skincare-types'
import { SkincarePhaseOverview } from '@/components/skincare-phase-overview'
import { SkincareRoutineCard } from '@/components/skincare-routine-card'
import { SkincareCheckIn } from '@/components/skincare-check-in'
import { SkincareSkinType } from '@/components/skincare-skin-type'

export default function SkincarePage() {
  const [currentPhase, setCurrentPhase] = useState<SkincareCyclePhase>('follicular')
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Derive cycle phase from cycle start date stored in localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cycleStartDate')
      if (saved) {
        const cycleStart = new Date(saved)
        const today = new Date()
        const cycleData = calculateCyclePhase(today, cycleStart)
        setCurrentPhase(mapCyclePhaseToSkincare(cycleData.phase))
      }
    }
  }, [])

  const routines = getPhaseRoutines(currentPhase)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline text-sm font-medium">Settings</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Skincare
          </h1>
          <p className="text-muted-foreground text-pretty">
            Gentle, cycle-aware skincare support. Your skin changes across your cycle, and that is completely normal.
          </p>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <SkincareSkinType />
          </div>
        )}

        {/* Phase Overview */}
        <div className="mb-8">
          <SkincarePhaseOverview phase={currentPhase} />
        </div>

        {/* Skin Check-in */}
        <div className="mb-8">
          <SkincareCheckIn />
        </div>

        {/* Daily Routine Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Your routines
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Tap a routine to see the step-by-step guide.
          </p>
          <div className="space-y-4">
            {routines.map((routine) => (
              <SkincareRoutineCard key={routine.id} routine={routine} />
            ))}
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
            Explore other phases
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['menstrual', 'follicular', 'ovulation', 'luteal'] as SkincareCyclePhase[]).map(
              (phase) => (
                <button
                  key={phase}
                  onClick={() => setCurrentPhase(phase)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    currentPhase === phase
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="font-semibold text-foreground mb-3">
            How this works
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Routines adapt based on your current cycle phase</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Skin changes across your cycle are normal and expected</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Less is more. Simple, consistent care over aggressive routines</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Everything here is optional. Your skin, your pace.</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
