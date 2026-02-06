'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { UserProfile, ProfileSection } from '@/lib/profile-types'
import { PROFILE_SECTIONS, saveProfile } from '@/lib/profile-utils'
import { ProfileStepBasics } from './profile-step-basics'
import { ProfileStepBody } from './profile-step-body'
import { ProfileStepLifestyle } from './profile-step-lifestyle'
import { ProfileStepCycle } from './profile-step-cycle'
import { ProfileStepEmotional } from './profile-step-emotional'
import { ProfileStepDietary } from './profile-step-dietary'
import { ArrowLeft, Check, Info } from 'lucide-react'

interface Props {
  section: ProfileSection
  profile: UserProfile
  onSave: (updated: UserProfile) => void
  onCancel: () => void
}

export function ProfileSectionEditor({ section, profile, onSave, onCancel }: Props) {
  const [draft, setDraft] = useState<UserProfile>({ ...profile })
  const meta = PROFILE_SECTIONS.find((s) => s.id === section)

  function update(updates: Partial<UserProfile>) {
    setDraft((prev) => ({ ...prev, ...updates }))
  }

  function save() {
    saveProfile(draft)
    onSave(draft)
  }

  return (
    <div className="space-y-6">
      {/* Back + section info */}
      <div>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </button>

        {meta && (
          <div className="flex items-start gap-2 rounded-lg bg-muted/30 border border-border p-4 mb-6">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground mb-0.5">Why we ask this</p>
              <p className="text-xs text-muted-foreground">{meta.whyWeAsk}</p>
            </div>
          </div>
        )}
      </div>

      {/* Step form */}
      {section === 'basics' && <ProfileStepBasics profile={draft} onChange={update} />}
      {section === 'body' && <ProfileStepBody profile={draft} onChange={update} />}
      {section === 'lifestyle' && <ProfileStepLifestyle profile={draft} onChange={update} />}
      {section === 'cycle' && <ProfileStepCycle profile={draft} onChange={update} />}
      {section === 'emotional' && <ProfileStepEmotional profile={draft} onChange={update} />}
      {section === 'dietary' && <ProfileStepDietary profile={draft} onChange={update} />}

      {/* Save / cancel */}
      <div className="flex items-center gap-3 pt-4">
        <Button onClick={save} size="sm" className="gap-2">
          <Check className="h-4 w-4" />
          Save changes
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel} className="text-muted-foreground">
          Cancel
        </Button>
      </div>
    </div>
  )
}
