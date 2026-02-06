// Partner / Companion Mode Types
// Privacy-first: partner sees abstracted context, never raw data

export type PartnerSharingStatus = 'inactive' | 'pending' | 'active' | 'paused'

export type SharingScope =
  | 'cycle-phase'
  | 'energy-mood'
  | 'support-suggestions'

export interface PartnerConfig {
  status: PartnerSharingStatus
  partnerName: string
  inviteCode: string | null
  inviteMethod: 'link' | 'email' | null
  sharingScopes: SharingScope[]
  partnerNotificationsEnabled: boolean
  pauseUntil: Date | null // null = not paused
  hideToday: boolean
  consentGivenAt: Date | null
  createdAt: Date
}

export interface PartnerCycleContext {
  phaseLabel: string
  phaseDescription: string
  // No dates, no countdowns, no predictions
}

export type EnergyMoodTag =
  | 'low-energy'
  | 'needs-rest'
  | 'emotionally-sensitive'
  | 'feeling-balanced'
  | 'higher-energy'
  | 'socially-open'
  | 'needs-space'

export interface PartnerMoodContext {
  tags: EnergyMoodTag[]
  // No history, no timestamps, no comparison
}

export interface PartnerSupportSuggestion {
  id: string
  message: string
  context: string // gentle explanation
  category: 'patience' | 'comfort' | 'space' | 'connection' | 'practical'
}

export interface PartnerNotification {
  id: string
  message: string
  sentAt: Date
  read: boolean
}

export interface PartnerEducationArticle {
  id: string
  slug: string
  title: string
  summary: string
  content: string[] // paragraphs
  category: 'cycle-basics' | 'mood-shifts' | 'pms-reality' | 'support-skills'
}

export const DEFAULT_PARTNER_CONFIG: PartnerConfig = {
  status: 'inactive',
  partnerName: '',
  inviteCode: null,
  inviteMethod: null,
  sharingScopes: ['cycle-phase', 'energy-mood', 'support-suggestions'],
  partnerNotificationsEnabled: false,
  pauseUntil: null,
  hideToday: false,
  consentGivenAt: null,
  createdAt: new Date(),
}
