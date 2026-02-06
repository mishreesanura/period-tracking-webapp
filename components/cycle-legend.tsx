'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CycleLegendProps {
  className?: string
}

export function CycleLegende({ className }: CycleLegendProps) {
  const phases = [
    {
      label: 'Period',
      color: 'bg-[hsl(var(--cycle-period))]',
      description: 'Menstruation days',
    },
    {
      label: 'Spotting',
      color: 'bg-[hsl(var(--cycle-spotting))]',
      description: 'Light spotting',
    },
    {
      label: 'Ovulation',
      color: 'bg-[hsl(var(--cycle-fertile))]',
      description: 'Most fertile days',
    },
    {
      label: 'Safe Days',
      color: 'bg-[hsl(var(--cycle-safe))]',
      description: 'Low fertility',
    },
    {
      label: 'PMS',
      color: 'bg-[hsl(var(--cycle-pms))]',
      description: 'Premenstrual phase',
    },
    {
      label: 'Predicted',
      color: 'border-2 border-dashed border-foreground bg-white',
      description: 'Predicted phase (lighter)',
    },
  ]

  return (
    <div className={cn('w-full', className)}>
      <h3 className="text-sm font-semibold text-foreground mb-3">Legend</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {phases.map((phase) => (
          <div key={phase.label} className="flex items-start gap-2">
            <div
              className={`w-6 h-6 rounded flex-shrink-0 ${phase.color}`}
              aria-label={phase.label}
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground">{phase.label}</span>
              <span className="text-xs text-muted-foreground">{phase.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
