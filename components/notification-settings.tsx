'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { NotificationPreferences, ToneMode } from '@/lib/notification-types'
import {
  TONE_MODE_LABELS,
  TONE_MODE_DESCRIPTIONS,
  DEFAULT_NOTIFICATION_PREFERENCES,
} from '@/lib/notification-types'
import { loadPreferences, savePreferences } from '@/lib/notification-utils'

interface NotificationSettingsProps {
  onClose: () => void
}

const TONE_MODES: ToneMode[] = ['cute-soft', 'fun-quirky', 'affirmations', 'calm-minimal', 'silent']

export function NotificationSettings({ onClose }: NotificationSettingsProps) {
  const [prefs, setPrefs] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFERENCES)

  useEffect(() => {
    setPrefs(loadPreferences())
  }, [])

  const handleSave = () => {
    savePreferences(prefs)
    onClose()
  }

  const handlePauseToday = () => {
    const today = new Date().toISOString().slice(0, 10)
    setPrefs((prev) => ({
      ...prev,
      pausedForToday: !prev.pausedForToday,
      pausedDate: !prev.pausedForToday ? today : null,
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-foreground mb-1">Notification Settings</h2>
        <p className="text-muted-foreground text-sm">
          Control how and when notifications reach you. Silence is always allowed.
        </p>
      </div>

      {/* Tone Mode */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
          Notification Style
        </label>
        <div className="space-y-2">
          {TONE_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => setPrefs((prev) => ({ ...prev, toneMode: mode }))}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                prefs.toneMode === mode
                  ? 'border-foreground/30 bg-muted/60 text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-foreground/15'
              }`}
            >
              <p className="text-sm font-medium text-foreground">{TONE_MODE_LABELS[mode]}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {TONE_MODE_DESCRIPTIONS[mode]}
              </p>
            </button>
          ))}
        </div>
      </div>

      {prefs.toneMode !== 'silent' && (
        <>
          {/* Max per day */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Maximum per day
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setPrefs((prev) => ({ ...prev, maxPerDay: n }))}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    prefs.maxPerDay === n
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              We may send fewer if you seem busy. Respect is prioritised over engagement.
            </p>
          </div>

          {/* Quiet hours */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Quiet hours
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Start
                </label>
                <select
                  value={prefs.quietHoursStart}
                  onChange={(e) =>
                    setPrefs((prev) => ({ ...prev, quietHoursStart: parseInt(e.target.value) }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i}>
                      {String(i).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  End
                </label>
                <select
                  value={prefs.quietHoursEnd}
                  onChange={(e) =>
                    setPrefs((prev) => ({ ...prev, quietHoursEnd: parseInt(e.target.value) }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i}>
                      {String(i).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              No notifications during these hours.
            </p>
          </div>

          {/* Pause for today */}
          <div>
            <button
              onClick={handlePauseToday}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                prefs.pausedForToday
                  ? 'border-foreground/30 bg-muted/60 text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-foreground/15'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Pause for today</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {prefs.pausedForToday
                      ? 'Notifications paused. They will resume tomorrow.'
                      : 'Take a break from notifications until tomorrow.'}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    prefs.pausedForToday
                      ? 'border-foreground bg-foreground'
                      : 'border-muted-foreground/40'
                  }`}
                >
                  {prefs.pausedForToday && (
                    <svg
                      className="w-3 h-3 text-background"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          </div>
        </>
      )}

      {/* Save */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSave}
          className="w-full px-4 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity text-sm"
        >
          Save Settings
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-medium text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
