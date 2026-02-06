'use client'

import type { SoundPreference } from '@/lib/sounds-types'
import { getSoundTypeLabel } from '@/lib/sounds-utils'

interface SoundsPreferencesProps {
  preferred: SoundPreference[]
  onToggle: (type: SoundPreference) => void
  onClose: () => void
}

const allTypes: SoundPreference[] = ['instrumental', 'vocals', 'nature', 'ambient']

const typeDescriptions: Record<SoundPreference, string> = {
  instrumental: 'Piano, guitar, strings. No words.',
  vocals: 'Soft, gentle singing.',
  nature: 'Rain, birds, streams, wind.',
  ambient: 'Brown noise, drones, textures.',
}

export function SoundsPreferences({ preferred, onToggle, onClose }: SoundsPreferencesProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-foreground">Sound preferences</h2>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Done
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Select the kinds of sounds you prefer. Leave all unselected to see everything.
      </p>
      <div className="space-y-2">
        {allTypes.map((type) => {
          const isActive = preferred.includes(type)
          return (
            <button
              key={type}
              onClick={() => onToggle(type)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
                isActive
                  ? 'border-foreground/30 bg-muted/60'
                  : 'border-border bg-card hover:border-foreground/15'
              }`}
              aria-pressed={isActive}
            >
              <div>
                <span className="text-sm font-medium text-foreground">{getSoundTypeLabel(type)}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {typeDescriptions[type]}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isActive
                    ? 'border-foreground bg-foreground'
                    : 'border-muted-foreground/40'
                }`}
              >
                {isActive && (
                  <svg
                    className="w-3 h-3 text-background"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
