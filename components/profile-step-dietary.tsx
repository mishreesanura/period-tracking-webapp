'use client'

import { Label } from '@/components/ui/label'
import type { UserProfile, DietaryPreference } from '@/lib/profile-types'
import { DIETARY_LABELS } from '@/lib/profile-utils'

interface Props {
  profile: UserProfile
  onChange: (updates: Partial<UserProfile>) => void
}

const allDietary: DietaryPreference[] = [
  'no-preference',
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
]

export function ProfileStepDietary({ profile, onChange }: Props) {
  const current = profile.dietaryPreferences ?? []

  function toggle(d: DietaryPreference) {
    if (d === 'no-preference') {
      onChange({ dietaryPreferences: current.includes('no-preference') ? [] : ['no-preference'] })
      return
    }
    const withoutNoPref = current.filter((x) => x !== 'no-preference')
    const next = withoutNoPref.includes(d)
      ? withoutNoPref.filter((x) => x !== d)
      : [...withoutNoPref, d]
    onChange({ dietaryPreferences: next })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Food preferences</h2>
        <p className="text-muted-foreground text-sm">
          So we only suggest foods you actually eat. This is optional.
        </p>
      </div>

      <div className="space-y-3">
        <Label className="text-foreground">Any dietary preferences?</Label>
        <div className="flex flex-wrap gap-2">
          {allDietary.map((d) => (
            <button
              key={d}
              onClick={() => toggle(d)}
              className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                current.includes(d)
                  ? 'border-primary bg-primary/5 text-foreground font-medium'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {DIETARY_LABELS[d]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
