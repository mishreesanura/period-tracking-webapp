'use client'

import { useState, useEffect } from 'react'
import type { SkinFeeling, SkinCheckIn } from '@/lib/skincare-types'

interface SkincareCheckInProps {
  onCheckIn?: (feeling: SkinFeeling) => void
}

const feelings: { value: SkinFeeling; label: string }[] = [
  { value: 'calm', label: 'Calm' },
  { value: 'breakout', label: 'Breakout' },
  { value: 'oily', label: 'Oily' },
  { value: 'sensitive', label: 'Sensitive' },
]

export function SkincareCheckIn({ onCheckIn }: SkincareCheckInProps) {
  const [selected, setSelected] = useState<SkinFeeling | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skinCheckIns')
      if (saved) {
        const checkIns: SkinCheckIn[] = JSON.parse(saved)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const todayCheckIn = checkIns.find((c) => {
          const d = new Date(c.timestamp)
          d.setHours(0, 0, 0, 0)
          return d.getTime() === today.getTime()
        })
        if (todayCheckIn) {
          setAlreadyCheckedIn(true)
          setSelected(todayCheckIn.feeling)
        }
      }
    }
  }, [])

  const handleSelect = (feeling: SkinFeeling) => {
    setSelected(feeling)

    const newCheckIn: SkinCheckIn = {
      id: `${Date.now()}`,
      feeling,
      timestamp: new Date(),
    }

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skinCheckIns') || '[]'
      const checkIns = JSON.parse(saved)
      checkIns.push(newCheckIn)
      localStorage.setItem('skinCheckIns', JSON.stringify(checkIns))
    }

    setAlreadyCheckedIn(true)
    onCheckIn?.(feeling)
  }

  if (dismissed) return null

  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1">
            How does your skin feel today?
          </h3>
          <p className="text-xs text-muted-foreground">
            {alreadyCheckedIn
              ? 'Thanks for checking in.'
              : 'Entirely optional. Helps improve future suggestions.'}
          </p>
        </div>
        {!alreadyCheckedIn && (
          <button
            onClick={() => setDismissed(true)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss skin check-in"
          >
            Skip
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {feelings.map((feeling) => (
          <button
            key={feeling.value}
            onClick={() => !alreadyCheckedIn && handleSelect(feeling.value)}
            disabled={alreadyCheckedIn}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              selected === feeling.value
                ? 'bg-foreground text-background border-foreground'
                : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
            } ${alreadyCheckedIn && selected !== feeling.value ? 'opacity-40' : ''}`}
          >
            {feeling.label}
          </button>
        ))}
      </div>
    </div>
  )
}
