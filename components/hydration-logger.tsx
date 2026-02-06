'use client'

import { useState, useEffect } from 'react'
import { Droplet } from 'lucide-react'
import { calculateGlassesFromAmount, formatGlassCount, getProgressPercentage, getProgressMessage } from '@/lib/hydration-utils'
import type { HydrationEntry } from '@/lib/hydration-types'

interface HydrationLoggerProps {
  todayEntries: HydrationEntry[]
  onLogWater: (amount: 'half' | 'full') => void
}

export function HydrationLogger({
  todayEntries,
  onLogWater,
}: HydrationLoggerProps) {
  const [glassCount, setGlassCount] = useState(0)

  useEffect(() => {
    const count = todayEntries.reduce((sum, entry) => {
      return sum + calculateGlassesFromAmount(entry.amount)
    }, 0)
    setGlassCount(count)
  }, [todayEntries])

  const progressPercent = getProgressPercentage(glassCount)
  const message = getProgressMessage(glassCount)

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Droplet className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Hydration Today</h2>
      </div>

      {/* Progress Droplet */}
      <div className="mb-6 text-center">
        <div className="relative inline-block mb-4">
          {/* Progress ring */}
          <svg className="h-32 w-32" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${(progressPercent / 100) * 314} 314`}
              className="text-primary transition-all"
              style={{ transitionDuration: '300ms' }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-foreground">
              {formatGlassCount(glassCount)}
            </p>
            <p className="text-xs text-muted-foreground">today</p>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>

      {/* Log Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onLogWater('half')}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-colors"
        >
          + ½ glass
        </button>
        <button
          onClick={() => onLogWater('full')}
          className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          + 1 glass
        </button>
      </div>

      {/* Entries List */}
      {todayEntries.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-3">
            TODAY'S ENTRIES
          </p>
          <div className="space-y-2">
            {todayEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30 text-sm"
              >
                <span className="text-foreground">
                  {entry.amount === 'full' ? '1 glass' : '½ glass'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
