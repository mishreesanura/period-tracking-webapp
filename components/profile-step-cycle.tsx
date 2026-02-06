'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import type { UserProfile, PMSSymptom } from '@/lib/profile-types'
import { PMS_SYMPTOM_LABELS } from '@/lib/profile-utils'
import { Info } from 'lucide-react'

interface Props {
  profile: UserProfile
  onChange: (updates: Partial<UserProfile>) => void
}

const allSymptoms: PMSSymptom[] = [
  'bloating', 'cramps', 'headaches', 'fatigue',
  'breast-tenderness', 'mood-swings', 'irritability',
  'food-cravings', 'trouble-sleeping', 'back-pain',
]

const painLabels = ['None', 'Mild', 'Noticeable', 'Moderate', 'Strong', 'Severe']

export function ProfileStepCycle({ profile, onChange }: Props) {
  const currentSymptoms = profile.pmsSymptoms ?? []

  function toggleSymptom(s: PMSSymptom) {
    const next = currentSymptoms.includes(s)
      ? currentSymptoms.filter((x) => x !== s)
      : [...currentSymptoms, s]
    onChange({ pmsSymptoms: next })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Cycle background</h2>
        <p className="text-muted-foreground text-sm">
          Share only what you are comfortable with. Everything here is optional.
        </p>
      </div>

      {/* Average cycle length */}
      <div className="space-y-2">
        <Label htmlFor="profile-cycle-length" className="text-foreground">
          Average cycle length (days)
        </Label>
        <Input
          id="profile-cycle-length"
          type="number"
          min={18}
          max={45}
          placeholder="e.g. 28"
          value={profile.averageCycleLength ?? ''}
          onChange={(e) => {
            const val = e.target.value
            onChange({ averageCycleLength: val ? Number.parseInt(val, 10) : undefined })
          }}
          className="max-w-[140px]"
        />
        <div className="flex items-start gap-2">
          <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Typical cycles range from 21 to 35 days. There is no wrong answer.
          </p>
        </div>
      </div>

      {/* Period pain level */}
      <div className="space-y-3">
        <Label className="text-foreground">Period pain level</Label>
        <div className="px-1">
          <Slider
            min={0}
            max={5}
            step={1}
            value={[profile.periodPainLevel ?? 0]}
            onValueChange={(val) => onChange({ periodPainLevel: val[0] as 0|1|2|3|4|5 })}
            className="w-full max-w-sm"
          />
          <div className="flex justify-between max-w-sm mt-1">
            {painLabels.map((label) => (
              <span key={label} className="text-[10px] text-muted-foreground">{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* PMS symptoms */}
      <div className="space-y-3">
        <Label className="text-foreground">Common PMS symptoms you experience</Label>
        <div className="flex flex-wrap gap-2">
          {allSymptoms.map((s) => (
            <button
              key={s}
              onClick={() => toggleSymptom(s)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                currentSymptoms.includes(s)
                  ? 'border-primary bg-primary/5 text-foreground font-medium'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {PMS_SYMPTOM_LABELS[s]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
