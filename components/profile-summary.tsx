'use client'

import { Button } from '@/components/ui/button'
import type { UserProfile, ProfileSection } from '@/lib/profile-types'
import {
  PROFILE_SECTIONS,
  getCompletedSections,
  getIncompleteSections,
  ROUTINE_LABELS,
  STRESS_LABELS,
  PMS_SYMPTOM_LABELS,
  EMOTIONAL_PATTERN_LABELS,
  DIETARY_LABELS,
} from '@/lib/profile-utils'
import { Check, Plus, Info, Trash2 } from 'lucide-react'

interface Props {
  profile: UserProfile
  onEditSection: (section: ProfileSection) => void
  onDelete: () => void
}

export function ProfileSummary({ profile, onEditSection, onDelete }: Props) {
  const completed = getCompletedSections(profile)
  const incomplete = getIncompleteSections(profile)

  function renderSectionContent(section: ProfileSection) {
    switch (section) {
      case 'basics':
        return (
          <div className="text-sm text-muted-foreground space-y-1">
            {profile.name && <p>Name: {profile.name}</p>}
            {profile.age && <p>Age: {profile.age}</p>}
          </div>
        )
      case 'body':
        if (profile.preferNotToSayBody) {
          return <p className="text-sm text-muted-foreground italic">Preferred not to share</p>
        }
        return (
          <div className="text-sm text-muted-foreground space-y-1">
            {profile.heightCm && <p>Height: {profile.heightCm} cm</p>}
            {profile.weightKg && <p>Weight: {profile.weightKg} kg</p>}
          </div>
        )
      case 'lifestyle':
        return (
          <div className="text-sm text-muted-foreground space-y-1">
            {profile.routineType && <p>{ROUTINE_LABELS[profile.routineType]}</p>}
            {profile.stressLevel && <p>Stress: {STRESS_LABELS[profile.stressLevel]}</p>}
          </div>
        )
      case 'cycle':
        return (
          <div className="text-sm text-muted-foreground space-y-1">
            {profile.averageCycleLength && <p>Cycle length: ~{profile.averageCycleLength} days</p>}
            {profile.periodPainLevel !== undefined && profile.periodPainLevel > 0 && (
              <p>Pain level: {profile.periodPainLevel}/5</p>
            )}
            {profile.pmsSymptoms && profile.pmsSymptoms.length > 0 && (
              <p>Symptoms: {profile.pmsSymptoms.map((s) => PMS_SYMPTOM_LABELS[s]).join(', ')}</p>
            )}
          </div>
        )
      case 'emotional':
        return (
          <div className="text-sm text-muted-foreground space-y-1">
            {profile.emotionalPatterns?.map((p) => (
              <p key={p}>{EMOTIONAL_PATTERN_LABELS[p]}</p>
            ))}
          </div>
        )
      case 'dietary':
        return (
          <div className="text-sm text-muted-foreground">
            {profile.dietaryPreferences?.map((d) => DIETARY_LABELS[d]).join(', ')}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Completed sections */}
      {completed.length > 0 && (
        <div className="space-y-3">
          {completed.map((sectionId) => {
            const meta = PROFILE_SECTIONS.find((s) => s.id === sectionId)
            if (!meta) return null
            return (
              <div
                key={sectionId}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{meta.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground h-auto py-1"
                    onClick={() => onEditSection(sectionId)}
                  >
                    Edit
                  </Button>
                </div>
                {renderSectionContent(sectionId)}
              </div>
            )
          })}
        </div>
      )}

      {/* Incomplete sections -- soft CTA, no pressure */}
      {incomplete.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1 mb-1">
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Want more personalized insights? Add more details below.
            </p>
          </div>
          {incomplete.map((sectionId) => {
            const meta = PROFILE_SECTIONS.find((s) => s.id === sectionId)
            if (!meta) return null
            return (
              <button
                key={sectionId}
                onClick={() => onEditSection(sectionId)}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-lg border border-dashed border-border bg-card/50 hover:bg-muted/30 transition-colors text-left"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted">
                  <Plus className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{meta.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{meta.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Delete all data */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive gap-2"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
          Delete all profile data
        </Button>
        <p className="text-xs text-muted-foreground mt-2 px-1">
          This permanently removes all profile information from this device.
        </p>
      </div>
    </div>
  )
}
