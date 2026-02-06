'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Shield } from 'lucide-react'
import type { UserProfile, ProfileSection } from '@/lib/profile-types'
import { loadProfile, saveProfile, clearProfile, getProfileGreeting, getCompletedSections } from '@/lib/profile-utils'
import { ProfileOnboarding } from '@/components/profile-onboarding'
import { ProfileSummary } from '@/components/profile-summary'
import { ProfileSectionEditor } from '@/components/profile-section-editor'

type PageView = 'loading' | 'onboarding' | 'profile' | 'editing'

export default function ProfilePage() {
  const [view, setView] = useState<PageView>('loading')
  const [profile, setProfile] = useState<UserProfile>({})
  const [editingSection, setEditingSection] = useState<ProfileSection | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const loaded = loadProfile()
    setProfile(loaded)
    setView(loaded.onboardingCompleted ? 'profile' : 'onboarding')
  }, [])

  function handleOnboardingComplete(completed: UserProfile) {
    setProfile(completed)
    setView('profile')
  }

  function handleEditSection(section: ProfileSection) {
    setEditingSection(section)
    setView('editing')
  }

  function handleSaveEdit(updated: UserProfile) {
    setProfile(updated)
    setEditingSection(null)
    setView('profile')
  }

  function handleCancelEdit() {
    setEditingSection(null)
    setView('profile')
  }

  function handleDelete() {
    clearProfile()
    setProfile({})
    setShowDeleteConfirm(false)
    setView('onboarding')
  }

  if (view === 'loading') {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </main>
    )
  }

  if (view === 'onboarding') {
    return <ProfileOnboarding initialProfile={profile} onComplete={handleOnboardingComplete} />
  }

  if (view === 'editing' && editingSection) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <ProfileSectionEditor
            section={editingSection}
            profile={profile}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        </div>
      </main>
    )
  }

  // Profile view
  const completed = getCompletedSections(profile)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            {getProfileGreeting(profile)}
          </h1>
          <p className="text-muted-foreground text-sm">
            {completed.length === 6
              ? 'Your profile is complete. Edit anything anytime.'
              : 'Your profile helps personalize your experience. Add more details whenever you like.'}
          </p>
        </div>

        {/* Profile summary */}
        <ProfileSummary
          profile={profile}
          onEditSection={handleEditSection}
          onDelete={() => setShowDeleteConfirm(true)}
        />

        {/* Delete confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="mx-4 max-w-sm w-full rounded-lg border border-border bg-card p-6 shadow-lg">
              <h3 className="font-semibold text-foreground mb-2">Delete all profile data?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This will permanently remove all profile information from this device. You can set it up again anytime.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                >
                  Delete everything
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy footer */}
        <div className="mt-8 flex items-center gap-2 px-1">
          <Shield className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Your data belongs to you. Everything is stored locally on your device and never shared.
          </p>
        </div>
      </div>
    </main>
  )
}
