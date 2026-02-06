export type MoodCategory = 'sad' | 'anxious' | 'angry' | 'numb' | 'calm' | 'neutral'
export type MoodIntensity = 'low' | 'medium' | 'high'

export interface JournalEntry {
  id: string
  content: string
  createdAt: Date
  moodCategory: MoodCategory
  moodIntensity: MoodIntensity
  cyclePhase?: 'period' | 'spotting' | 'fertile' | 'ovulation' | 'pms' | 'safe'
  aiResponse?: string
}

export interface JournalContext {
  entries: JournalEntry[]
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void
  deleteEntry: (id: string) => void
}

export const MOOD_CATEGORIES: Record<MoodCategory, string> = {
  sad: 'Sad',
  anxious: 'Anxious',
  angry: 'Angry',
  numb: 'Numb',
  calm: 'Calm',
  neutral: 'Neutral',
}

export const INITIAL_PROMPTS = [
  { text: 'Free journaling', emoji: '✍️' },
  { text: "I'm feeling low", emoji: '💙' },
  { text: "I'm irritated", emoji: '😤' },
  { text: "I don't know how I feel", emoji: '🤷' },
]
