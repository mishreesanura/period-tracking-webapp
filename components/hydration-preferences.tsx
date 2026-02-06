'use client'

import { useState, useEffect } from 'react'
import { getReminderFrequencyLabel } from '@/lib/hydration-utils'
import { defaultPreferences } from '@/lib/hydration-utils'
import type { HydrationPreferences } from '@/lib/hydration-types'

interface HydrationPreferencesProps {
  onSave?: (preferences: HydrationPreferences) => void
  isModal?: boolean
  onClose?: () => void
}

export function HydrationPreferencesSettings({
  onSave,
  isModal = false,
  onClose,
}: HydrationPreferencesProps) {
  const [preferences, setPreferences] = useState<HydrationPreferences>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hydrationPreferences')
      return saved ? JSON.parse(saved) : defaultPreferences
    }
    return defaultPreferences
  })

  const handleSave = () => {
    localStorage.setItem('hydrationPreferences', JSON.stringify(preferences))
    onSave?.(preferences)
  }

  return (
    <div className={isModal ? '' : 'space-y-6'}>
      {!isModal && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Hydration Preferences
          </h2>
          <p className="text-muted-foreground">
            Customize your hydration reminders. You can change these anytime.
          </p>
        </div>
      )}

      {/* Enable/Disable */}
      <div>
        <label className="block font-semibold text-foreground mb-3">
          Hydration Reminders
        </label>
        <button
          onClick={() =>
            setPreferences((prev) => ({
              ...prev,
              enabled: !prev.enabled,
            }))
          }
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
            preferences.enabled
              ? 'border-primary bg-primary/5 text-foreground'
              : 'border-border hover:border-primary/30 text-muted-foreground'
          }`}
        >
          <p className="font-medium">
            {preferences.enabled ? 'Enabled' : 'Disabled'}
          </p>
          <p className="text-xs mt-1">
            {preferences.enabled
              ? 'You will receive reminders'
              : 'No reminders will be sent'}
          </p>
        </button>
      </div>

      {preferences.enabled && (
        <>
          {/* Reminder Frequency */}
          <div>
            <label className="block font-semibold text-foreground mb-3">
              How often should we remind you?
            </label>
            <div className="space-y-2">
              {[
                { value: 'few' as const, label: 'Few (2–3 per day)' },
                { value: 'moderate' as const, label: 'Moderate (4–5 per day)' },
                { value: 'frequent' as const, label: 'Frequent (6–7 per day)' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      reminderFrequency: option.value,
                    }))
                  }
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    preferences.reminderFrequency === option.value
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border hover:border-primary/30 text-muted-foreground'
                  }`}
                >
                  <p className="font-medium">{option.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Window */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Start time
              </label>
              <select
                value={preferences.timeWindowStart}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    timeWindowStart: parseInt(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i}:00
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                End time
              </label>
              <select
                value={preferences.timeWindowEnd}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    timeWindowEnd: parseInt(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i}:00
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Snooze Duration */}
          <div>
            <label className="block font-semibold text-foreground mb-3">
              Snooze duration
            </label>
            <select
              value={preferences.snoozeMinutes}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  snoozeMinutes: parseInt(e.target.value),
                }))
              }
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </div>

          {/* Warm Drinks */}
          <div>
            <button
              onClick={() =>
                setPreferences((prev) => ({
                  ...prev,
                  countWarmDrinks: !prev.countWarmDrinks,
                }))
              }
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                preferences.countWarmDrinks
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border hover:border-primary/30 text-muted-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Count warm drinks</p>
                  <p className="text-xs mt-1">
                    {preferences.countWarmDrinks
                      ? 'Warm drinks count toward hydration'
                      : 'Only cold water counts'}
                  </p>
                </div>
                <div
                  className={`h-5 w-5 rounded border flex items-center justify-center flex-shrink-0 ${
                    preferences.countWarmDrinks
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}
                >
                  {preferences.countWarmDrinks && (
                    <span className="text-xs font-bold text-primary-foreground">✓</span>
                  )}
                </div>
              </div>
            </button>
          </div>
        </>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Save Preferences
      </button>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full px-4 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors font-medium"
        >
          Close
        </button>
      )}
    </div>
  )
}
