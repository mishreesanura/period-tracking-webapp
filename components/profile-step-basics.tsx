'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UserProfile } from '@/lib/profile-types'
import { Info } from 'lucide-react'

interface Props {
  profile: UserProfile
  onChange: (updates: Partial<UserProfile>) => void
}

export function ProfileStepBasics({ profile, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">About you</h2>
        <p className="text-muted-foreground text-sm">
          Just the basics so we can personalize your experience.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="profile-name" className="text-foreground">
            What should we call you?
          </Label>
          <Input
            id="profile-name"
            placeholder="A name, nickname, anything you like"
            value={profile.name ?? ''}
            onChange={(e) => onChange({ name: e.target.value })}
            className="max-w-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-age" className="text-foreground">
            Age
          </Label>
          <Input
            id="profile-age"
            type="number"
            min={10}
            max={65}
            placeholder="e.g. 24"
            value={profile.age ?? ''}
            onChange={(e) => {
              const val = e.target.value
              onChange({ age: val ? Number.parseInt(val, 10) : undefined })
            }}
            className="max-w-[120px]"
          />
          <div className="flex items-start gap-2 mt-1">
            <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Age helps us understand natural cycle patterns. No age-based warnings, ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
