export type RiskZone = 'stable' | 'monitor' | 'consider'
export type SimilarityBand = 'low' | 'moderate' | 'higher'

export interface PatternData {
  cycleLength: number
  cycleVariability: number
  missedCycles: number
  delayedCycles: number
  symptoms: SymptomFrequency[]
  moodTrends: MoodTrend[]
}

export interface SymptomFrequency {
  symptom: string
  frequency: number // percentage 0-100
  byPhase: Record<string, number>
  trend: 'increasing' | 'stable' | 'decreasing'
}

export interface MoodTrend {
  mood: string
  cyclePhase: string
  frequency: number
  stressCorrelation: number
}

export interface AIInsight {
  id: string
  title: string
  whatNoticed: string
  frequency: string
  whatItCouldBe: string
  whatYouCanDo?: string
  severity: 'low' | 'medium' | 'high'
  cyclesAffected: number
}

export interface RiskSignal {
  zone: RiskZone
  patterns: string[]
  description: string
}

export interface PCOSAwareness {
  activated: boolean
  optedIn: boolean
  cyclesTracked: number
  patterns: PCOSPattern[]
  similarityBand: SimilarityBand
  explanation: string
  nextSteps: string[]
}

export interface PCOSPattern {
  category: string
  patterns: string[]
  duration: string
  confidence: number
}

export interface DoctorExport {
  cycleHistory: CycleRecord[]
  symptomTimeline: SymptomEvent[]
  aiObservations: string[]
  questionsChecklist: string[]
  exportDate: Date
}

export interface CycleRecord {
  date: Date
  phase: string
  length: number
  notes?: string
}

export interface SymptomEvent {
  date: Date
  symptoms: string[]
  severity: string
  mood?: string
}
