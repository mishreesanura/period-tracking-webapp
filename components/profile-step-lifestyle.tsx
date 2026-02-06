'use client'

import { Label } from '@/components/ui/label'
import type { UserProfile, RoutineType, StressLevel } from '@/lib/profile-types'
import { ROUTINE_LABELS, STRESS_LABELS } from '@/lib/profile-utils'
import { Info } from 'lucide-react'

interface Props {
  profile: UserProfile
  onChange: (updates: Partial<UserProfile>) => void
}

const routineOptions: RoutineType[] = [
  'mostly-sitting',
  'standing-moving',
  'physically-demanding',
  'shift-work',
  'irregular',
]

const stressOptions: StressLevel[] = ['low', 'moderate', 'high']

export function ProfileStepLifestyle({ profile, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Daily routine</h2>
        <p className="text-muted-foreground text-sm">
          Daily routine can affect stress and cycles. This is entirely optional.
        </p>
      </div>

      {/* Routine type */}
      <div className="space-y-3">
        <Label className="text-foreground">What does your typical day look like?</Label>
        <div className="space-y-2">
          {routineOptions.map((rt) => (
            <button
              key={rt}
              onClick={() => onChange({ routineType: profile.routineType === rt ? undefined : rt })}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                profile.routineType === rt
                  ? 'border-primary bg-primary/5 text-foreground font-medium'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {ROUTINE_LABELS[rt]}
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2">
          <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Work stress can influence cycle regularity and mood.
          </p>
        </div>
      </div>

      {/* Stress level */}
      <div className="space-y-3">
        <Label className="text-foreground">How would you rate your overall stress?</Label>
        <div className="flex gap-3">
          {stressOptions.map((sl) => (
            <button
              key={sl}
              onClick={() => onChange({ stressLevel: profile.stressLevel === sl ? undefined : sl })}
              className={`flex-1 px-4 py-3 rounded-lg border text-sm text-center transition-colors ${
                profile.stressLevel === sl
                  ? 'border-primary bg-primary/5 text-foreground font-medium'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {STRESS_LABELS[sl]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
