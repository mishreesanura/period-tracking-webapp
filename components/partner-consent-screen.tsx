'use client'

import { useState } from 'react'
import { Shield, Eye, EyeOff, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PartnerConsentScreenProps {
  onConsent: () => void
  onCancel: () => void
}

export function PartnerConsentScreen({ onConsent, onCancel }: PartnerConsentScreenProps) {
  const [understood, setUnderstood] = useState(false)

  const canSee = [
    'Which cycle phase you are in (e.g. "Luteal Phase") with a gentle description',
    'Abstract energy and mood tags (e.g. "Low energy", "Needs rest")',
    'Supportive action suggestions to help them be a better partner',
    'Educational articles about the menstrual cycle and emotional support',
  ]

  const cannotSee = [
    'Your journal entries or private reflections',
    'Exact symptom logs, dates, or health data',
    'Weight, BMI, or any medical information',
    'Predictions, timelines, or countdowns',
    'Chatbot conversations',
    'Risk scores or detailed health insights',
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Shield className="h-7 w-7 text-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Before You Share</h2>
        <p className="text-muted-foreground text-pretty">
          Your partner will only see what you choose to share — never your private journal or health details.
        </p>
      </div>

      {/* What they CAN see */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-4 w-4 text-foreground" />
          <h3 className="text-sm font-semibold text-foreground">What your partner CAN see</h3>
        </div>
        <ul className="space-y-3">
          {canSee.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What they CANNOT see */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <EyeOff className="h-4 w-4 text-foreground" />
          <h3 className="text-sm font-semibold text-foreground">What your partner CANNOT see</h3>
        </div>
        <ul className="space-y-3">
          {cannotSee.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-destructive flex-shrink-0 mt-0.5 font-bold text-xs">{'x'}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation */}
      <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-border bg-muted/30 p-4">
        <input
          type="checkbox"
          checked={understood}
          onChange={(e) => setUnderstood(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border"
        />
        <span className="text-sm text-foreground">
          I understand what will and will not be shared. I can pause or revoke access at any time without explanation.
        </span>
      </label>

      {/* Privacy footer */}
      <p className="text-xs text-muted-foreground text-center text-pretty">
        You are always in control. Sharing can be paused or stopped anytime. No questions asked.
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={onCancel}>
          Not now
        </Button>
        <Button
          className="flex-1"
          disabled={!understood}
          onClick={onConsent}
        >
          I consent to sharing
        </Button>
      </div>
    </div>
  )
}
