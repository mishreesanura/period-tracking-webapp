'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Bell, Settings as SettingsIcon, User, Users } from 'lucide-react'
import { NotificationSettings } from '@/components/notification-settings'
import { PartnerSettings } from '@/components/partner-settings'

type SettingsSection = 'main' | 'notifications' | 'partner'

export default function SettingsPage() {
  const [section, setSection] = useState<SettingsSection>('main')

  if (section === 'notifications') {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <NotificationSettings onClose={() => setSection('main')} />
        </div>
      </main>
    )
  }

  if (section === 'partner') {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <PartnerSettings onClose={() => setSection('main')} />
        </div>
      </main>
    )
  }

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your preferences. Everything here is optional.
          </p>
        </div>

        {/* Settings sections */}
        <div className="space-y-2">
          <Link
            href="/profile"
            className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              <User className="h-5 w-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Profile & Health Context</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Personal details, lifestyle, cycle background. Edit or delete anytime.
              </p>
            </div>
            <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180 flex-shrink-0" />
          </Link>

          <button
            onClick={() => setSection('notifications')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              <Bell className="h-5 w-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tone, frequency, quiet hours, and pause controls.
              </p>
            </div>
            <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180 flex-shrink-0" />
          </button>

          <button
            onClick={() => setSection('partner')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              <Users className="h-5 w-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Partner / Companion Mode</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Help your partner understand and support you. Privacy-first.
              </p>
            </div>
            <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180 flex-shrink-0" />
          </button>

          <div className="flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card opacity-50 cursor-default">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              <SettingsIcon className="h-5 w-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">General</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                App-wide preferences. Coming soon.
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="font-semibold text-foreground mb-3">About notifications</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Notifications adapt to your mood and cycle phase automatically</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Tone is adjusted to match how you are feeling, never against it</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>If you ignore notifications, frequency reduces silently</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-bold">{'\u2192'}</span>
              <span>Silence is always an option. No guilt, no consequences.</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
