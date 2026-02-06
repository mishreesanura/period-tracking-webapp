'use client'

import { useState } from 'react'
import { Copy, Mail, Link as LinkIcon, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateInviteCode } from '@/lib/partner-utils'

interface PartnerSetupProps {
  onComplete: (partnerName: string, method: 'link' | 'email', code: string) => void
  onBack: () => void
}

export function PartnerSetup({ onComplete, onBack }: PartnerSetupProps) {
  const [step, setStep] = useState<'name' | 'method' | 'share'>('name')
  const [partnerName, setPartnerName] = useState('')
  const [method, setMethod] = useState<'link' | 'email' | null>(null)
  const [inviteCode] = useState(generateInviteCode)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/companion?code=${inviteCode}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (step === 'name') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Add a Partner</h2>
          <p className="text-sm text-muted-foreground text-pretty">
            What name would you like to use for your partner? This is just for display within the app.
          </p>
        </div>

        <div>
          <label htmlFor="partner-name" className="block text-sm font-medium text-foreground mb-2">
            Partner name
          </label>
          <Input
            id="partner-name"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="e.g. Alex, My Partner"
            className="max-w-sm"
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            disabled={partnerName.trim().length === 0}
            onClick={() => setStep('method')}
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  if (step === 'method') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">How would you like to invite {partnerName}?</h2>
          <p className="text-sm text-muted-foreground text-pretty">
            Choose how to share the companion invite. They will create a read-only companion account.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setMethod('link')
              setStep('share')
            }}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              <LinkIcon className="h-5 w-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Share a secure link</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Copy a unique link to send however you prefer.
              </p>
            </div>
          </button>

          <button
            onClick={() => {
              setMethod('email')
              setStep('share')
            }}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
              <Mail className="h-5 w-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Invite via email</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Send an email invitation with instructions.
              </p>
            </div>
          </button>
        </div>

        <Button variant="outline" onClick={() => setStep('name')}>
          Back
        </Button>
      </div>
    )
  }

  // Share step
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          {method === 'link' ? 'Share this link' : 'Send this invite'}
        </h2>
        <p className="text-sm text-muted-foreground text-pretty">
          {partnerName} will use this to create their companion account. It is read-only and can be revoked at any time.
        </p>
      </div>

      {/* Invite code display */}
      <div className="rounded-lg border border-border bg-muted/30 p-5">
        <p className="text-xs text-muted-foreground mb-2">Invite code</p>
        <div className="flex items-center gap-3">
          <code className="text-lg font-mono font-bold text-foreground tracking-widest">
            {inviteCode}
          </code>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-1">{copied ? 'Copied' : 'Copy'}</span>
          </Button>
        </div>

        {method === 'link' && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">Companion link</p>
            <div className="flex items-center gap-2">
              <code className="text-xs text-muted-foreground break-all bg-muted rounded px-2 py-1 flex-1">
                {typeof window !== 'undefined' ? window.location.origin : ''}/companion?code={inviteCode}
              </code>
            </div>
          </div>
        )}

        {method === 'email' && (
          <div className="mt-4">
            <label htmlFor="partner-email" className="block text-xs text-muted-foreground mb-2">
              Partner email address
            </label>
            <Input
              id="partner-email"
              type="email"
              placeholder="partner@email.com"
              className="max-w-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              An invitation with instructions will be sent to this address.
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-pretty">
        This invite expires after 7 days or when you revoke it. Your partner will only see what you consented to share.
      </p>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep('method')}>
          Back
        </Button>
        <Button onClick={() => onComplete(partnerName, method!, inviteCode)}>
          Done
        </Button>
      </div>
    </div>
  )
}
