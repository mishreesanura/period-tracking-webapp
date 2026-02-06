'use client'

import type { SoundMood } from '@/lib/sounds-types'
import { getMoodLabel, getMoodDescription, getMoodTagColor } from '@/lib/sounds-utils'

interface SoundsMoodSelectorProps {
  activeMood: SoundMood | null
  onSelect: (mood: SoundMood | null) => void
}

const moods: SoundMood[] = ['comforting', 'calm', 'overwhelmed', 'sleepy', 'focus']

export function SoundsMoodSelector({ activeMood, onSelect }: SoundsMoodSelectorProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-sm font-semibold text-foreground mb-1">
        What do you feel like listening to right now?
      </h2>
      <p className="text-xs text-muted-foreground mb-4">
        This will adjust your suggestions for this session.
      </p>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => {
          const isActive = activeMood === mood
          return (
            <button
              key={mood}
              onClick={() => onSelect(isActive ? null : mood)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                isActive
                  ? `${getMoodTagColor(mood)} border-transparent`
                  : 'bg-muted/50 text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground'
              }`}
              aria-pressed={isActive}
            >
              <span className="block">{getMoodLabel(mood)}</span>
              <span className="block text-[11px] font-normal opacity-70 mt-0.5">
                {getMoodDescription(mood)}
              </span>
            </button>
          )
        })}
      </div>
      {activeMood && (
        <p className="text-xs text-muted-foreground mt-3">
          Showing sounds for how you feel. Tap again to return to cycle-based suggestions.
        </p>
      )}
    </div>
  )
}
