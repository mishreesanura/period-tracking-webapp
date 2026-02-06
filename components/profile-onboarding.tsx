'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { UserProfile } from '@/lib/profile-types'
import { saveProfile } from '@/lib/profile-utils'
import { ProfileStepBasics } from './profile-step-basics'
import { ProfileStepBody } from './profile-step-body'
import { ProfileStepLifestyle } from './profile-step-lifestyle'
import { ProfileStepCycle } from './profile-step-cycle'
import { ProfileStepEmotional } from './profile-step-emotional'
import { ProfileStepDietary } from './profile-step-dietary'
import { Shield, Check } from 'lucide-react'

interface Props {
  initialProfile: UserProfile
  onComplete: (profile: UserProfile) => void
}

export function ProfileOnboarding({ initialProfile, onComplete }: Props) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile)

  function update(updates: Partial<UserProfile>) {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  function handleComplete() {
    saveProfile(profile)
    const completed = { ...profile, onboardingCompleted: true }
    saveProfile(completed)
    onComplete(completed)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
           <h1 className="text-3xl font-bold text-foreground mb-2">Build your profile</h1>
           <p className="text-muted-foreground">Complete these details to get personalized cycle insights. You can edit them later.</p>
        </div>

        {/* Form Sections */}
        <div className="space-y-16">
          <section id="basics" className="scroll-mt-20">
             <ProfileStepBasics profile={profile} onChange={update} />
          </section>
          
          <div className="h-px bg-border/50" />

          <section id="body" className="scroll-mt-20">
            <ProfileStepBody profile={profile} onChange={update} />
          </section>

          <div className="h-px bg-border/50" />

          <section id="lifestyle" className="scroll-mt-20">
            <ProfileStepLifestyle profile={profile} onChange={update} />
          </section>

          <div className="h-px bg-border/50" />

          <section id="cycle" className="scroll-mt-20">
             <ProfileStepCycle profile={profile} onChange={update} />
          </section>

          <div className="h-px bg-border/50" />

          <section id="emotional" className="scroll-mt-20">
             <ProfileStepEmotional profile={profile} onChange={update} />
          </section>

          <div className="h-px bg-border/50" />

          <section id="dietary" className="scroll-mt-20">
            <ProfileStepDietary profile={profile} onChange={update} />
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-border">
          {/* Privacy note */}
          <div className="flex items-center gap-2 mb-6 px-1">
            <Shield className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Your data belongs to you. Everything stays on this device.
            </p>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleComplete} 
              size="lg" 
              className="rounded-xl px-8"
            >
              <Check className="mr-2 h-4 w-4" />
              Complete Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

