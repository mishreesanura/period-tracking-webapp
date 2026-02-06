export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive' | 'unsure'

export type SkinSymptom = 'acne' | 'oiliness' | 'dryness' | 'sensitivity'

export type SkinFeeling = 'calm' | 'breakout' | 'oily' | 'sensitive'

export type RoutineTiming = 'am' | 'pm'

export type RoutineFocus = 'hydration' | 'calm' | 'balance' | 'protect' | 'soothe'

export type SkincareCyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

export interface SkincareRoutineStep {
  name: string
  description: string
  productType?: string
}

export interface SkincareRoutine {
  id: string
  timing: RoutineTiming
  title: string
  focusTags: RoutineFocus[]
  contextMessage: string
  steps: SkincareRoutineStep[]
  cyclePhase: SkincareCyclePhase
}

export interface SkinPhaseInfo {
  phase: SkincareCyclePhase
  label: string
  commonSkinState: string[]
  uiCopy: string
  routineFocus: string[]
}

export interface SkinCheckIn {
  id: string
  feeling: SkinFeeling
  timestamp: Date
}

export interface UserSkincarePreferences {
  skinType: SkinType | null
  loggedSymptoms: SkinSymptom[]
}
