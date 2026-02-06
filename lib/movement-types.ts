import type { CyclePhase } from './cycle-utils'

export type MovementType = 'yoga' | 'gym' | 'home'
export type IntensityLevel = 'low' | 'moderate'
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced'
export type FocusArea = 'full-body' | 'upper' | 'lower' | 'core' | 'back' | 'stretching' | 'breathing'

export interface MovementPreferences {
  fitnessLevel: FitnessLevel
  movementTypes: MovementType[]
  goesToGym: boolean
}

export interface Movement {
  id: string
  name: string
  type: MovementType
  duration: number // minutes
  intensity: IntensityLevel
  focusArea: FocusArea
  description: string
  whyToday: string
  exercises: string[]
  safetyNotes: string[]
  suitablePhases: CyclePhase[]
}

export interface MovementCard {
  id: string
  movement: Movement
  reason: string
  suggestedPhase: CyclePhase
}
