'use client'

import { useState } from 'react'
import { Shield, Pause, Play, EyeOff, Trash2, Bell, BellOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import type { PartnerConfig, SharingScope } from '@/lib/partner-types'
import { getScopeLabel, getScopeDescription } from '@/lib/partner-utils'

interface PartnerControlsProps {
  config: PartnerConfig
  onUpdate: (config: Partial<PartnerConfig>) => void
  onRevoke: () => void
}

export function PartnerControls({ config, onUpdate, onRevoke }: PartnerControlsProps) {
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false)
  const isPaused = config.status === 'paused'

  const handleToggleScope = (scope: SharingScope) => {
    const current = config.sharingScopes
    const updated = current.includes(scope)
      ? current.filter((s) => s !== scope)
      : [...current, scope]
    onUpdate({ sharingScopes: updated })
  }

  const handlePauseToday = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    onUpdate({ status: 'paused', pauseUntil: tomorrow })
  }

  const handlePauseWeek = () => {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextWeek.setHours(0, 0, 0, 0)
    onUpdate({ status: 'paused', pauseUntil: nextWeek })
  }

  const handleResume = () => {
    onUpdate({ status: 'active', pauseUntil: null })
  }

  const allScopes: SharingScope[] = ['cycle-phase', 'energy-mood', 'support-suggestions']

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Companion Status</h3>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            isPaused
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            {isPaused ? 'Paused' : 'Active'}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Sharing with {config.partnerName || 'your partner'}
          {isPaused && config.pauseUntil && (
            <> {' -- '}paused until {config.pauseUntil.toLocaleDateString()}</>
          )}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>

        {!isPaused ? (
          <>
            <button
              onClick={() => onUpdate({ hideToday: !config.hideToday })}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <EyeOff className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {config.hideToday ? 'Resume sharing today' : 'Hide everything today'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {config.hideToday ? 'Your partner can see shared info again.' : 'One tap. No explanations needed.'}
                </p>
              </div>
            </button>

            <button
              onClick={handlePauseToday}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <Pause className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Pause for today</p>
                <p className="text-xs text-muted-foreground">Resumes automatically tomorrow.</p>
              </div>
            </button>

            <button
              onClick={handlePauseWeek}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
            >
              <Pause className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Pause for a week</p>
                <p className="text-xs text-muted-foreground">Resumes automatically in 7 days.</p>
              </div>
            </button>
          </>
        ) : (
          <button
            onClick={handleResume}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
          >
            <Play className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Resume sharing</p>
              <p className="text-xs text-muted-foreground">Your partner will see shared information again.</p>
            </div>
          </button>
        )}
      </div>

      {/* Sharing Scopes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">What You Share</h3>
        {allScopes.map((scope) => (
          <div
            key={scope}
            className="flex items-start gap-4 px-4 py-3 rounded-lg border border-border bg-card"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{getScopeLabel(scope)}</p>
              <p className="text-xs text-muted-foreground mt-0.5 text-pretty">
                {getScopeDescription(scope)}
              </p>
            </div>
            <Switch
              checked={config.sharingScopes.includes(scope)}
              onCheckedChange={() => handleToggleScope(scope)}
            />
          </div>
        ))}
      </div>

      {/* Partner Notifications */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {config.partnerNotificationsEnabled ? (
                <Bell className="h-4 w-4 text-foreground" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
              <p className="text-sm font-medium text-foreground">Partner notifications</p>
            </div>
            <p className="text-xs text-muted-foreground text-pretty">
              Gentle, low-frequency nudges sent to your partner. No urgency, no performance pressure.
            </p>
          </div>
          <Switch
            checked={config.partnerNotificationsEnabled}
            onCheckedChange={(checked) => onUpdate({ partnerNotificationsEnabled: checked })}
          />
        </div>
      </div>

      {/* Revoke Access */}
      <div className="pt-4 border-t border-border">
        {!showRevokeConfirm ? (
          <button
            onClick={() => setShowRevokeConfirm(true)}
            className="flex items-center gap-2 text-sm text-destructive hover:underline"
          >
            <Trash2 className="h-4 w-4" />
            Revoke partner access
          </button>
        ) : (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
            <p className="text-sm text-foreground font-medium">
              Remove {config.partnerName || 'your partner'}?
            </p>
            <p className="text-xs text-muted-foreground">
              This will immediately revoke all access. No explanation is required. You can set up a new companion anytime.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowRevokeConfirm(false)}>
                Keep access
              </Button>
              <Button variant="destructive" size="sm" onClick={onRevoke}>
                Revoke access
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Privacy footer */}
      <p className="text-xs text-muted-foreground text-center text-pretty">
        You are always in control. Sharing can be paused or stopped anytime.
      </p>
    </div>
  )
}
