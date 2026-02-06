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
import { ArrowRight, ArrowLeft, SkipForward, Check, Shield } from 'lucide-react'

const STEP_ORDER: ProfileSection[] = ['basics', 'body', 'lifestyle', 'cycle', 'emotional', 'dietary']

interface Props {
  initialProfile: UserProfile
  onComplete: (profile: UserProfile) => void
}

export function ProfileOnboarding({ initialProfile, onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0)
  const [profile, setProfile] = useState<UserProfile>(initialProfile)

  const currentStep = STEP_ORDER[stepIndex]
  const sectionMeta = PROFILE_SECTIONS.find((s) => s.id === currentStep)
  const isLast = stepIndex === STEP_ORDER.length - 1
  const isFirst = stepIndex === 0

  function update(updates: Partial<UserProfile>) {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  function next() {
    saveProfile(profile)
    if (isLast) {
      const completed = { ...profile, onboardingCompleted: true }
      saveProfile(completed)
      onComplete(completed)
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  function back() {
    if (!isFirst) setStepIndex((i) => i - 1)
  }

  function skip() {
    saveProfile(profile)
    if (isLast) {
      const completed = { ...profile, onboardingCompleted: true }
      saveProfile(completed)
      onComplete(completed)
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress indicator */}
      <div className="mx-auto max-w-lg w-full px-4 pt-8">
        <div className="flex gap-1.5 mb-2">
          {STEP_ORDER.map((_, i) => (
            <div
              key={`step-${STEP_ORDER[i]}`}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= stepIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Step {stepIndex + 1} of {STEP_ORDER.length}
          {sectionMeta?.optional && ' (optional)'}
        </p>
      </div>

      {/* Step content */}
      <div className="flex-1 mx-auto max-w-lg w-full px-4 py-8">
        {currentStep === 'basics' && <ProfileStepBasics profile={profile} onChange={update} />}
        {currentStep === 'body' && <ProfileStepBody profile={profile} onChange={update} />}
        {currentStep === 'lifestyle' && <ProfileStepLifestyle profile={profile} onChange={update} />}
        {currentStep === 'cycle' && <ProfileStepCycle profile={profile} onChange={update} />}
        {currentStep === 'emotional' && <ProfileStepEmotional profile={profile} onChange={update} />}
        {currentStep === 'dietary' && <ProfileStepDietary profile={profile} onChange={update} />}
      </div>

      {/* Navigation buttons */}
      <div className="mx-auto max-w-lg w-full px-4 pb-8">
        {/* Privacy note */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <Shield className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <p className="text-xs text-muted-foreground">Your data belongs to you. Everything stays on this device.</p>
        </div>

        <div className="flex items-center gap-3">
          {!isFirst && (
            <Button variant="ghost" size="sm" onClick={back} className="gap-2 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}

          <div className="flex-1" />

          {sectionMeta?.optional && (
            <Button variant="ghost" size="sm" onClick={skip} className="gap-2 text-muted-foreground">
              <SkipForward className="h-4 w-4" />
              Skip
            </Button>
          )}

          <Button onClick={next} size="sm" className="gap-2">
            {isLast ? (
              <>
                <Check className="h-4 w-4" />
                Done
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
