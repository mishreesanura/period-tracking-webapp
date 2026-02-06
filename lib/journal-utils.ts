import type { MoodCategory, MoodIntensity } from './journal-types'

// Simple emotion detection based on keywords
const EMOTION_KEYWORDS: Record<MoodCategory, string[]> = {
  sad: ['sad', 'down', 'depressed', 'unhappy', 'miserable', 'grief', 'loss', 'hurt', 'disappointed', 'crying', 'cried'],
  anxious: ['anxious', 'worried', 'nervous', 'panic', 'fear', 'scared', 'stressed', 'overwhelmed', 'uneasy', 'tension'],
  angry: ['angry', 'mad', 'furious', 'rage', 'irritated', 'annoyed', 'frustrated', 'resentment', 'bitter'],
  numb: ['numb', 'empty', 'nothing', 'blank', 'disconnected', 'tired', 'exhausted', 'drained'],
  calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'good', 'okay', 'better'],
  neutral: [],
}

const INTENSITY_KEYWORDS: Record<MoodIntensity, string[]> = {
  high: ['very', 'so', 'extremely', 'intensely', 'can\'t', 'unbearable', 'overwhelming', 'can\'t stop', 'constantly'],
  medium: ['quite', 'really', 'pretty', 'somewhat', 'kind of'],
  low: ['a bit', 'slightly', 'little', 'small', 'minor'],
}

export function detectMood(text: string): { category: MoodCategory; intensity: MoodIntensity } {
  const lowerText = text.toLowerCase()
  let category: MoodCategory = 'neutral'
  let intensity: MoodIntensity = 'medium'

  // Detect mood category
  for (const [mood, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    if (keywords.some((keyword) => lowerText.includes(keyword))) {
      category = mood as MoodCategory
      break
    }
  }

  // Detect intensity
  if (INTENSITY_KEYWORDS.high.some((keyword) => lowerText.includes(keyword))) {
    intensity = 'high'
  } else if (INTENSITY_KEYWORDS.low.some((keyword) => lowerText.includes(keyword))) {
    intensity = 'low'
  }

  return { category, intensity }
}

export function generateAIResponse(
  userMessage: string,
  moodCategory: MoodCategory,
  cyclePhase?: string,
): string {
  // Acknowledgment phase
  const acknowledgments: Record<MoodCategory, string[]> = {
    sad: [
      "That sounds really heavy. I hear you.",
      "It makes sense that you're feeling this way.",
      "Thank you for sharing that.",
    ],
    anxious: [
      "That's a lot to carry. I can see why you'd feel this way.",
      "Anxiety is exhausting. Thank you for naming it.",
      "What you're feeling is valid.",
    ],
    angry: [
      "That anger makes sense.",
      "I hear the frustration in what you're saying.",
      "Your feelings are completely valid.",
    ],
    numb: [
      "Numbness is real, and it matters.",
      "That emptiness you're describing is worth paying attention to.",
      "Thank you for naming it, even if it feels hard to feel.",
    ],
    calm: [
      "That calm sounds grounding.",
      "I'm glad you're in that space right now.",
      "That peace matters.",
    ],
    neutral: [
      "Thank you for sharing.",
      "I'm here to listen.",
      "What you're feeling is valid.",
    ],
  }

  // Gentle follow-up questions (optional, one at a time)
  const followUpQuestions: Record<MoodCategory, string[]> = {
    sad: [
      "What's one thing that felt hard today?",
      "Where did you feel this sadness in your body?",
      "Is there anything that helped, even a little?",
    ],
    anxious: [
      "What feels uncertain right now?",
      "What would help you feel a bit more grounded?",
      "Is there anything that usually helps when you feel this way?",
    ],
    angry: [
      "What feels unfair or frustrating?",
      "What do you need right now?",
      "Is there something specific that set this off?",
    ],
    numb: [
      "When did this numbness start?",
      "What would it feel like to let yourself feel something?",
      "Is there anything you usually enjoy, even a little?",
    ],
    calm: [
      "What's helping you stay grounded?",
      "What would help you keep this feeling?",
      "Want to tell me more about what brought you here?",
    ],
    neutral: [
      "What's on your mind?",
      "Anything specific you want to explore?",
      "How are you really feeling?",
    ],
  }

  const selectedAck = acknowledgments[moodCategory][
    Math.floor(Math.random() * acknowledgments[moodCategory].length)
  ]

  let response = selectedAck

  // Add cycle awareness if relevant
  if (cyclePhase === 'pms') {
    response += ' Many people notice their feelings shift during this time—it\'s a real thing.'
  } else if (cyclePhase === 'period') {
    response += " It's completely normal for emotions to feel heavier right now."
  } else if (cyclePhase === 'ovulation') {
    response += " This is a time when many people feel more expressive and present."
  }

  // Add gentle reflection
  response += '\n\n'
  response +=
    userMessage.length > 100
      ? 'You shared a lot. That took courage.'
      : 'Thank you for that.'

  // Optional: Add a follow-up question (about 50% of the time)
  if (Math.random() > 0.5) {
    response += '\n\n'
    response += followUpQuestions[moodCategory][
      Math.floor(Math.random() * followUpQuestions[moodCategory].length)
    ]
  }

  return response
}

export function formatTime(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const dateOnly = new Date(date)
  dateOnly.setHours(0, 0, 0, 0)

  const todayOnly = new Date(today)
  todayOnly.setHours(0, 0, 0, 0)

  const yesterdayOnly = new Date(yesterday)
  yesterdayOnly.setHours(0, 0, 0, 0)

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Today'
  } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return 'Yesterday'
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  })
}
