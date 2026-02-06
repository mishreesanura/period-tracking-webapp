'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { UserProfile } from '@/lib/profile-types'
import { Info, EyeOff } from 'lucide-react'

interface Props {
  profile: UserProfile
  onChange: (updates: Partial<UserProfile>) => void
}

export function ProfileStepBody({ profile, onChange }: Props) {
  if (profile.preferNotToSayBody) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Body metrics</h2>
          <p className="text-muted-foreground text-sm">
            This helps us tailor movement and care suggestions. You can skip this entirely.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
          <EyeOff className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-4">
            You chose to skip this section. That is completely fine.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange({ preferNotToSayBody: false })}
          >
            I changed my mind
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Body metrics</h2>
        <p className="text-muted-foreground text-sm">
          This helps us tailor movement and care suggestions. You can skip this entirely.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="profile-height" className="text-foreground">
            Height (cm)
          </Label>
          <Input
            id="profile-height"
            type="number"
            min={100}
            max={250}
            placeholder="e.g. 165"
            value={profile.heightCm ?? ''}
            onChange={(e) => {
              const val = e.target.value
              onChange({ heightCm: val ? Number.parseInt(val, 10) : undefined })
            }}
            className="max-w-[140px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-weight" className="text-foreground">
            Weight (kg)
          </Label>
          <Input
            id="profile-weight"
            type="number"
            min={25}
            max={250}
            placeholder="e.g. 58"
            value={profile.weightKg ?? ''}
            onChange={(e) => {
              const val = e.target.value
              onChange({ weightKg: val ? Number.parseInt(val, 10) : undefined })
            }}
            className="max-w-[140px]"
          />
        </div>

        <div className="flex items-start gap-2">
          <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            We use this only as one of many health indicators, never as a label or judgment.
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={() => onChange({ preferNotToSayBody: true, heightCm: undefined, weightKg: undefined })}
      >
        Prefer not to say
      </Button>
    </div>
  )
}
