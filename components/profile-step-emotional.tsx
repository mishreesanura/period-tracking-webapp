'use client'

import { Label } from '@/components/ui/label'
import type { UserProfile, EmotionalPattern } from '@/lib/profile-types'
import { EMOTIONAL_PATTERN_LABELS } from '@/lib/profile-utils'
import { Info } from 'lucide-react'

interface Props {
  profile: UserProfile
  onChange: (updates: Partial<UserProfile>) => void
}

const allPatterns: EmotionalPattern[] = [
  'high-stress-often',
  'anxious-around-period',
  'significant-mood-changes',
]

export function ProfileStepEmotional({ profile, onChange }: Props) {
  const current = profile.emotionalPatterns ?? []

  function toggle(p: EmotionalPattern) {
    const next = current.includes(p) ? current.filter((x) => x !== p) : [...current, p]
    onChange({ emotionalPatterns: next })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Emotional context</h2>
        <p className="text-muted-foreground text-sm">
          This shapes journaling prompts, notification tone, and care suggestions.
        </p>
      </div>

      <div className="space-y-3">
        <Label className="text-foreground">Do any of these resonate with you?</Label>
        <div className="space-y-2">
          {allPatterns.map((p) => (
            <button
              key={p}
              onClick={() => toggle(p)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                current.includes(p)
                  ? 'border-primary bg-primary/5 text-foreground font-medium'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {EMOTIONAL_PATTERN_LABELS[p]}
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2">
          <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Understanding your emotional patterns lets us adjust tone and suggest support that fits how you feel.
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic">
        None of this is diagnostic. Select what feels true right now, or skip entirely.
      </p>
    </div>
  )
}
