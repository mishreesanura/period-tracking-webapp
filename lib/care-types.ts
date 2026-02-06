export type SuggestionCategory =
  | 'emotional-care'
  | 'nutrition'
  | 'physical-care'
  | 'rest'
  | 'mental-checkin'

export type CyclePhase =
  | 'period'
  | 'follicular'
  | 'ovulation'
  | 'luteal-pms'
  | 'unknown'

export type TimeOfDay = 'morning' | 'afternoon' | 'evening'

export interface CareSuggestion {
  id: string
  category: SuggestionCategory
  empathy: string
  suggestion: string
  reason: string
  timeOfDay?: TimeOfDay
  cyclePhase?: CyclePhase
  emotionalContext?: string[]
  createdAt: Date
}

export interface CareFeedback {
  suggestionId: string
  helpful: boolean | null
  reason?: 'not-relevant' | 'too-basic' | 'dont-want-category'
}

export interface UserCarePreferences {
  wantsMovement: boolean
  wantsNutrition: boolean
  wantsEmotionalCare: boolean
  wantsRestReminders: boolean
  wantsMentalCheckIns: boolean
  minimalMode: boolean
}
