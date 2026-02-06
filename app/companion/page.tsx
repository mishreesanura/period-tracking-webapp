'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Shield, Heart, BookOpen, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PartnerCompanionView } from '@/components/partner-companion-view'
import { PartnerEducation } from '@/components/partner-education'
import type { PartnerConfig } from '@/lib/partner-types'

type CompanionSection = 'landing' | 'join' | 'dashboard' | 'education'

export default function CompanionPage() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [section, setSection] = useState<CompanionSection>(code ? 'join' : 'landing')
  const [joinCode, setJoinCode] = useState(code || '')

  // Simulated active config for demo
  const demoConfig: PartnerConfig = {
    status: 'active',
    partnerName: 'Your partner',
    inviteCode: joinCode,
    inviteMethod: 'link',
    sharingScopes: ['cycle-phase', 'energy-mood', 'support-suggestions'],
    partnerNotificationsEnabled: false,
    pauseUntil: null,
    hideToday: false,
    consentGivenAt: new Date(),
    createdAt: new Date(),
  }

  if (section === 'dashboard') {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Companion View</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Supporting your partner with understanding and empathy.
              </p>
            </div>
          </div>

          <PartnerCompanionView config={demoConfig} />

          <div className="mt-8">
            <button
              onClick={() => setSection('education')}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <BookOpen className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Partner Learn</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Articles to help you understand and support better.
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground text-pretty text-center">
              This is a read-only companion view. Your partner controls what is shared and can pause or revoke access at any time. Respect their boundaries.
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (section === 'education') {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <button
            onClick={() => setSection('dashboard')}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Companion View
          </button>
          <PartnerEducation />
        </div>
      </main>
    )
  }

  if (section === 'join') {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-md px-4 sm:px-6 pt-16 pb-12">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <Heart className="h-7 w-7 text-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Join as a Companion</h1>
            <p className="text-sm text-muted-foreground text-pretty">
              Someone you care about has invited you to be their cycle companion. This gives you gentle context and support guidance -- never private health data.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="invite-code" className="block text-sm font-medium text-foreground mb-2">
                Invite code
              </label>
              <Input
                id="invite-code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="XXXX-XXXX"
                className="text-center font-mono tracking-widest text-lg"
              />
            </div>

            <Button
              className="w-full"
              disabled={joinCode.trim().length < 8}
              onClick={() => setSection('dashboard')}
            >
              Join as Companion
            </Button>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">What you will see</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground font-bold">{'\u2192'}</span>
                <span>General cycle phase context (no dates or countdowns)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground font-bold">{'\u2192'}</span>
                <span>Abstract energy and mood indicators</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground font-bold">{'\u2192'}</span>
                <span>Supportive action suggestions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground font-bold">{'\u2192'}</span>
                <span>Educational articles about cycles and support</span>
              </li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6 text-pretty">
            Your partner controls everything. They can pause or revoke your access at any time. This is about empathy, not monitoring.
          </p>
        </div>
      </main>
    )
  }

  // Landing page for companions without a code
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 sm:px-6 pt-16 pb-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Shield className="h-7 w-7 text-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Companion Mode</h1>
        <p className="text-sm text-muted-foreground mb-8 text-pretty">
          This page is for partners who have been invited. If you have an invite code, you can join below.
        </p>

        <Button onClick={() => setSection('join')}>
          I have an invite code
        </Button>

        <div className="mt-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Go to main app
          </Link>
        </div>
      </div>
    </main>
  )
}
