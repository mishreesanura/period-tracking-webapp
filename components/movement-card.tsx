'use client'

import Link from 'next/link'
import { Clock, Zap } from 'lucide-react'
import type { Movement } from '@/lib/movement-types'

interface MovementCardProps {
  movement: Movement
  reason: string
}

const movementTypeLabel: Record<string, string> = {
  yoga: 'Yoga',
  gym: 'Gym',
  home: 'Home',
}

const focusAreaLabel: Record<string, string> = {
  'full-body': 'Full Body',
  upper: 'Upper Body',
  lower: 'Lower Body',
  core: 'Core',
  back: 'Back',
  stretching: 'Stretching',
  breathing: 'Breathing',
}

const intensityColor: Record<string, string> = {
  low: 'text-green-600',
  moderate: 'text-yellow-600',
  high: 'text-red-600',
}

export function MovementCard({ movement, reason }: MovementCardProps) {
  return (
    <Link
      href={`/movement/${movement.id}`}
      className="group flex flex-col h-full rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/40 hover:bg-card/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-label={`${movement.name}, ${movement.duration} minutes, ${movement.intensity} intensity`}
    >
      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border/50">
          {movementTypeLabel[movement.type]}
        </span>
        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border/50">
          {focusAreaLabel[movement.focusArea]}
        </span>
      </div>

      {/* Title & Reason */}
      <div className="mb-4 flex-grow">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {movement.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {reason}
        </p>
      </div>

      {/* Metadata Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{movement.duration} min</span>
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-medium capitalize ${intensityColor[movement.intensity]}`}>
            <Zap className="h-4 w-4" />
            <span>{movement.intensity}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
