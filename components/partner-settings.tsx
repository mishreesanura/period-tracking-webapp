'use client'

import { useState } from 'react'
import { ChevronLeft, Users, Eye, BookOpen, Settings } from 'lucide-react'
import type { PartnerConfig } from '@/lib/partner-types'
import { DEFAULT_PARTNER_CONFIG } from '@/lib/partner-types'
import { PartnerConsentScreen } from '@/components/partner-consent-screen'
import { PartnerSetup } from '@/components/partner-setup'
import { PartnerControls } from '@/components/partner-controls'
import { PartnerCompanionView } from '@/components/partner-companion-view'
import { PartnerEducation } from '@/components/partner-education'

type PartnerView = 'main' | 'consent' | 'setup' | 'controls' | 'preview' | 'education'

interface PartnerSettingsProps {
  onClose: () => void
}

export function PartnerSettings({ onClose }: PartnerSettingsProps) {
  const [view, setView] = useState<PartnerView>('main')
  const [config, setConfig] = useState<PartnerConfig>(() => {
    // In a real app this loads from persistent storage
    return { ...DEFAULT_PARTNER_CONFIG }
  })

  const isActive = config.status === 'active' || config.status === 'paused'

  const handleConsent = () => {
    setConfig((prev) => ({
      ...prev,
      consentGivenAt: new Date(),
    }))
    setView('setup')
  }

  const handleSetupComplete = (partnerName: string, method: 'link' | 'email', code: string) => {
    setConfig((prev) => ({
      ...prev,
      status: 'active',
      partnerName,
      inviteMethod: method,
      inviteCode: code,
      createdAt: new Date(),
    }))
    setView('controls')
  }

  const handleUpdateConfig = (updates: Partial<PartnerConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const handleRevoke = () => {
    setConfig({ ...DEFAULT_PARTNER_CONFIG })
    setView('main')
  }

  // Sub-views with back navigation
  if (view === 'consent') {
    return (
      <div>
        <button
          onClick={() => setView('main')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <PartnerConsentScreen onConsent={handleConsent} onCancel={() => setView('main')} />
      </div>
    )
  }

  if (view === 'setup') {
    return (
      <div>
        <PartnerSetup onComplete={handleSetupComplete} onBack={() => setView('consent')} />
      </div>
    )
  }

  if (view === 'controls') {
    return (
      <div>
        <button
          onClick={() => setView('main')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Partner Mode
        </button>
        <h2 className="text-xl font-bold text-foreground mb-6">Sharing Controls</h2>
        <PartnerControls config={config} onUpdate={handleUpdateConfig} onRevoke={handleRevoke} />
      </div>
    )
  }

  if (view === 'preview') {
    return (
      <div>
        <button
          onClick={() => setView('main')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Partner Mode
        </button>
        <h2 className="text-xl font-bold text-foreground mb-6">Companion Preview</h2>
        <PartnerCompanionView config={config} />
      </div>
    )
  }

  if (view === 'education') {
    return (
      <div>
        <button
          onClick={() => setView('main')}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Partner Mode
        </button>
        <PartnerEducation />
      </div>
    )
  }

  // Main partner mode view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Settings
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Partner / Companion Mode</h1>
        </div>
        <p className="text-sm text-muted-foreground text-pretty">
          Help your partner understand and support you better -- without sharing private health data.
        </p>
      </div>

      {/* Status Banner */}
      {isActive ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">
            Companion mode is {config.status === 'paused' ? 'paused' : 'active'} for {config.partnerName}
          </p>
          <p className="text-xs text-emerald-700 mt-1">
            {config.status === 'paused'
              ? 'Sharing is temporarily paused. No information is visible to your partner.'
              : 'Your partner can see the information you chose to share.'
            }
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm font-medium text-foreground">No partner connected</p>
          <p className="text-xs text-muted-foreground mt-1">
            Set up companion mode to help someone close to you understand your cycle better.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        {!isActive ? (
          <button
            onClick={() => setView('consent')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              <Users className="h-5 w-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Add a Partner</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Set up companion access for someone you trust.
              </p>
            </div>
            <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180 flex-shrink-0" />
          </button>
        ) : (
          <>
            <button
              onClick={() => setView('controls')}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Settings className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Sharing Controls</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Manage what you share, pause or revoke access.
                </p>
              </div>
              <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180 flex-shrink-0" />
            </button>

            <button
              onClick={() => setView('preview')}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Eye className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Preview Companion View</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  See exactly what {config.partnerName} would see.
                </p>
              </div>
              <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180 flex-shrink-0" />
            </button>
          </>
        )}

        <button
          onClick={() => setView('education')}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
            <BookOpen className="h-5 w-5 text-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Partner Learn</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Educational articles for your partner about cycles, mood, and support.
            </p>
          </div>
          <ChevronLeft className="h-4 w-4 text-muted-foreground rotate-180 flex-shrink-0" />
        </button>
      </div>

      {/* Philosophy */}
      <div className="rounded-lg border border-border bg-muted/30 p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">How this works</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-foreground font-bold">{'\u2192'}</span>
            <span>Your partner sees insights, not raw data. Context, not tracking.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-bold">{'\u2192'}</span>
            <span>Every piece of shared information goes through your explicit consent.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-bold">{'\u2192'}</span>
            <span>You can pause, hide, or revoke access at any time. No explanation needed.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground font-bold">{'\u2192'}</span>
            <span>The goal is empathy and understanding -- not surveillance or monitoring.</span>
          </li>
        </ul>
      </div>

      {/* Privacy footer */}
      <p className="text-xs text-muted-foreground text-center text-pretty">
        Help them understand you -- not watch you. You are always in control.
      </p>
    </div>
  )
}
