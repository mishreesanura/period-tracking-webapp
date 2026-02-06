import type {
  PartnerCycleContext,
  PartnerMoodContext,
  PartnerSupportSuggestion,
  PartnerEducationArticle,
  EnergyMoodTag,
  SharingScope,
} from './partner-types'
import type { CyclePhase } from './cycle-utils'

// ─── Abstracted Cycle Context (no dates, no countdowns) ───

export function getPartnerCycleContext(phase: CyclePhase): PartnerCycleContext {
  const contexts: Record<CyclePhase, PartnerCycleContext> = {
    period: {
      phaseLabel: 'Menstrual Phase',
      phaseDescription:
        'This phase can bring lower energy, cramps, or emotional sensitivity for some people. Comfort and patience go a long way.',
    },
    spotting: {
      phaseLabel: 'Transitional Phase',
      phaseDescription:
        'Their body is shifting between phases. Energy and mood may fluctuate. Gentle presence helps.',
    },
    follicular: {
      phaseLabel: 'Follicular Phase',
      phaseDescription:
        'This phase often brings a gradual return of energy and motivation. A good time for shared plans or light activities.',
    },
    ovulation: {
      phaseLabel: 'Ovulation Phase',
      phaseDescription:
        'Energy and social openness tend to be higher during this phase. Connection and quality time may feel especially welcome.',
    },
    luteal: {
      phaseLabel: 'Luteal Phase',
      phaseDescription:
        'Energy may begin to slow down. Emotional depth can increase. Listening without trying to fix things is often appreciated.',
    },
    pms: {
      phaseLabel: 'Pre-Menstrual Phase',
      phaseDescription:
        'This phase can amplify emotions and lower patience. Extra gentleness, comfort, and understanding can make a real difference.',
    },
    'no-data': {
      phaseLabel: 'Phase Unknown',
      phaseDescription:
        'Cycle data is not available right now. Being present and supportive is always a good approach.',
    },
  }
  return contexts[phase]
}

// ─── Abstracted Mood/Energy Tags ───

export function getPartnerMoodContext(phase: CyclePhase): PartnerMoodContext {
  const moodMap: Record<CyclePhase, EnergyMoodTag[]> = {
    period: ['low-energy', 'needs-rest', 'emotionally-sensitive'],
    spotting: ['low-energy', 'needs-rest'],
    follicular: ['feeling-balanced', 'higher-energy'],
    ovulation: ['higher-energy', 'socially-open', 'feeling-balanced'],
    luteal: ['emotionally-sensitive', 'needs-space'],
    pms: ['low-energy', 'emotionally-sensitive', 'needs-space'],
    'no-data': ['feeling-balanced'],
  }
  return { tags: moodMap[phase] }
}

export function getMoodTagLabel(tag: EnergyMoodTag): string {
  const labels: Record<EnergyMoodTag, string> = {
    'low-energy': 'Low energy',
    'needs-rest': 'Needs rest',
    'emotionally-sensitive': 'Emotionally sensitive',
    'feeling-balanced': 'Feeling balanced',
    'higher-energy': 'Higher energy',
    'socially-open': 'Socially open',
    'needs-space': 'Needs space',
  }
  return labels[tag]
}

export function getMoodTagColor(tag: EnergyMoodTag): string {
  const colors: Record<EnergyMoodTag, string> = {
    'low-energy': 'bg-amber-50 text-amber-800 border-amber-200',
    'needs-rest': 'bg-indigo-50 text-indigo-800 border-indigo-200',
    'emotionally-sensitive': 'bg-rose-50 text-rose-800 border-rose-200',
    'feeling-balanced': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'higher-energy': 'bg-sky-50 text-sky-800 border-sky-200',
    'socially-open': 'bg-violet-50 text-violet-800 border-violet-200',
    'needs-space': 'bg-slate-50 text-slate-800 border-slate-200',
  }
  return colors[tag]
}

// ─── Support Suggestions (action-oriented, empathy-driven) ───

export function getPartnerSupportSuggestions(phase: CyclePhase): PartnerSupportSuggestion[] {
  const suggestions: Record<CyclePhase, PartnerSupportSuggestion[]> = {
    period: [
      {
        id: 'period-1',
        message: 'Today might be a good day to be extra patient.',
        context: 'Energy is often lower during this phase. Small gestures of patience go a long way.',
        category: 'patience',
      },
      {
        id: 'period-2',
        message: 'A warm drink or cozy gesture could mean a lot.',
        context: 'Physical comfort is especially welcome. Warmth helps with cramps and tension.',
        category: 'comfort',
      },
      {
        id: 'period-3',
        message: 'Listening may help more than fixing right now.',
        context: 'Sometimes emotions need space to exist without being solved.',
        category: 'patience',
      },
      {
        id: 'period-4',
        message: 'Offering to handle a small chore could relieve real pressure.',
        context: 'When energy is low, even small tasks feel bigger. Practical help is genuine care.',
        category: 'practical',
      },
    ],
    spotting: [
      {
        id: 'spotting-1',
        message: 'A calm, low-key evening together could feel right.',
        context: 'Transitions between phases can feel unsettled. Calmness helps.',
        category: 'comfort',
      },
      {
        id: 'spotting-2',
        message: 'Check in gently. A simple "How are you feeling?" matters.',
        context: 'Asking without expectation shows you care.',
        category: 'connection',
      },
    ],
    follicular: [
      {
        id: 'follicular-1',
        message: 'Your partner may feel more open to plans or activities.',
        context: 'Energy often returns during this phase. Shared experiences can feel especially good.',
        category: 'connection',
      },
      {
        id: 'follicular-2',
        message: 'Encouragement and enthusiasm are welcome right now.',
        context: 'This phase often brings motivation. Positive energy from you amplifies it.',
        category: 'connection',
      },
    ],
    ovulation: [
      {
        id: 'ovulation-1',
        message: 'Quality time together may feel especially meaningful.',
        context: 'Social energy and openness tend to peak. Make the most of it.',
        category: 'connection',
      },
      {
        id: 'ovulation-2',
        message: 'Express appreciation. It lands deeper right now.',
        context: 'Emotional receptivity is often higher during this phase.',
        category: 'connection',
      },
    ],
    luteal: [
      {
        id: 'luteal-1',
        message: 'Give them space if they seem quieter than usual.',
        context: 'Turning inward is natural during this phase. It is not about you.',
        category: 'space',
      },
      {
        id: 'luteal-2',
        message: 'Avoid bringing up stressful topics if possible.',
        context: 'Emotional sensitivity increases. Timing conversations matters.',
        category: 'patience',
      },
      {
        id: 'luteal-3',
        message: 'A small comforting gesture could mean a lot.',
        context: 'Comfort foods, a blanket, or a kind word. Small things land big.',
        category: 'comfort',
      },
    ],
    pms: [
      {
        id: 'pms-1',
        message: 'Today may feel emotionally heavy for your partner. Gentle support can help.',
        context: 'PMS amplifies emotions. They are real and valid, not exaggerated.',
        category: 'patience',
      },
      {
        id: 'pms-2',
        message: 'Do not take mood shifts personally.',
        context: 'Hormonal changes affect mood in ways that are not about your relationship.',
        category: 'patience',
      },
      {
        id: 'pms-3',
        message: 'Ask what they need instead of assuming.',
        context: 'Sometimes space is needed. Sometimes closeness. Asking shows respect.',
        category: 'space',
      },
      {
        id: 'pms-4',
        message: 'Taking something off their plate could relieve invisible stress.',
        context: 'Mental load feels heavier during PMS. Proactive help is powerful.',
        category: 'practical',
      },
    ],
    'no-data': [
      {
        id: 'default-1',
        message: 'Check in with how your partner is feeling today.',
        context: 'Consistent, gentle attention builds trust over time.',
        category: 'connection',
      },
      {
        id: 'default-2',
        message: 'Being present is often enough.',
        context: 'You do not always need to do something. Being there matters.',
        category: 'patience',
      },
    ],
  }
  return suggestions[phase]
}

export function getSuggestionCategoryIcon(category: PartnerSupportSuggestion['category']): string {
  const icons: Record<PartnerSupportSuggestion['category'], string> = {
    patience: 'clock',
    comfort: 'heart',
    space: 'shield',
    connection: 'users',
    practical: 'hand-helping',
  }
  return icons[category]
}

export function getSuggestionCategoryLabel(category: PartnerSupportSuggestion['category']): string {
  const labels: Record<PartnerSupportSuggestion['category'], string> = {
    patience: 'Patience',
    comfort: 'Comfort',
    space: 'Space',
    connection: 'Connection',
    practical: 'Practical Help',
  }
  return labels[category]
}

export function getScopeLabel(scope: SharingScope): string {
  const labels: Record<SharingScope, string> = {
    'cycle-phase': 'Cycle phase awareness',
    'energy-mood': 'Energy & mood context',
    'support-suggestions': 'Support suggestions',
  }
  return labels[scope]
}

export function getScopeDescription(scope: SharingScope): string {
  const descriptions: Record<SharingScope, string> = {
    'cycle-phase': 'Your partner sees which phase you are in (e.g. "Luteal Phase") with a gentle explanation. No dates or countdowns.',
    'energy-mood': 'Abstract mood tags like "Low energy" or "Needs rest". No tracking history or timestamps.',
    'support-suggestions': 'Actionable suggestions for how your partner can support you. No data is shared, only guidance.',
  }
  return descriptions[scope]
}

// ─── Generate invite code ───

export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${code.slice(0, 4)}-${code.slice(4)}`
}

// ─── Partner Education Library ───

export function getPartnerEducationArticles(): PartnerEducationArticle[] {
  return [
    {
      id: 'edu-1',
      slug: 'understanding-the-cycle',
      title: 'Understanding the Menstrual Cycle',
      summary: 'A simple, honest overview of what happens during each phase and why it matters.',
      category: 'cycle-basics',
      content: [
        'The menstrual cycle is a roughly 28-day process, though it varies widely between people. It is not just about periods. It affects energy, mood, sleep, appetite, and social needs throughout the entire month.',
        'There are four main phases: menstrual (period), follicular, ovulation, and luteal. Each phase brings different hormonal shifts that influence how someone feels physically and emotionally.',
        'During the menstrual phase, energy is often lowest. The follicular phase brings gradual renewal. Ovulation typically peaks energy and social openness. The luteal phase and pre-menstrual days can bring sensitivity, lower patience, and a need for more rest.',
        'None of these changes are choices. They are physiological. Understanding them helps you respond with empathy instead of confusion.',
      ],
    },
    {
      id: 'edu-2',
      slug: 'why-moods-shift',
      title: 'Why Moods Can Shift',
      summary: 'Mood changes are not personal attacks. They are biological realities.',
      category: 'mood-shifts',
      content: [
        'Hormones like estrogen and progesterone fluctuate throughout the cycle. These fluctuations directly affect neurotransmitters like serotonin and dopamine, which regulate mood, motivation, and emotional processing.',
        'During the luteal phase and PMS, progesterone rises and then drops sharply. This drop can trigger irritability, sadness, anxiety, or emotional sensitivity. It is not a personality flaw. It is chemistry.',
        'Understanding this means you can stop asking "Why are you upset?" and instead ask "What do you need right now?" That shift in question changes everything.',
        'Mood changes are temporary. They pass. Your patience during these moments builds deeper trust and connection.',
      ],
    },
    {
      id: 'edu-3',
      slug: 'what-pms-actually-is',
      title: 'What PMS Actually Is (And Is Not)',
      summary: 'PMS is real, common, and misunderstood. Here is what you should know.',
      category: 'pms-reality',
      content: [
        'PMS (premenstrual syndrome) affects up to 75% of menstruating people. Symptoms can include bloating, headaches, fatigue, mood swings, irritability, and anxiety. It typically occurs 1-2 weeks before the period starts.',
        'PMS is NOT an excuse, a joke, or something to dismiss. Saying "Are you on your period?" as an explanation for someone\'s feelings is dismissive and harmful.',
        'What PMS actually is: a real physiological response to hormonal shifts. Some people experience it mildly. Others experience it severely (PMDD). Both are valid.',
        'The best response to PMS is not to diagnose or explain it. It is to be present, patient, and willing to adjust expectations. That is genuine partnership.',
      ],
    },
    {
      id: 'edu-4',
      slug: 'how-to-support-without-minimizing',
      title: 'How to Support Without Minimizing',
      summary: 'Practical guidance on being genuinely supportive without accidentally dismissing feelings.',
      category: 'support-skills',
      content: [
        'Minimizing sounds like: "It is not that bad," "Just relax," "You are overreacting." These phrases, even when well-intentioned, make someone feel unheard.',
        'Supporting sounds like: "I can see this is hard," "What would help right now?" or simply being present without commentary. Sometimes silence and a warm presence is the most powerful support.',
        'Avoid trying to fix emotions. Most of the time, your partner does not need a solution. They need to feel seen and safe. Let them express without jumping to problem-solving.',
        'Practical support matters too. Handling a chore, bringing a warm drink, suggesting a quiet evening, or simply lowering expectations for the day. These actions speak louder than words.',
        'The goal is not to understand everything perfectly. It is to show up consistently with kindness. That is enough.',
      ],
    },
    {
      id: 'edu-5',
      slug: 'what-not-to-say',
      title: 'Things to Avoid Saying',
      summary: 'Well-meaning phrases that can accidentally cause harm, and what to say instead.',
      category: 'support-skills',
      content: [
        'Avoid: "Are you on your period?" -- This reduces someone\'s valid emotions to a biological event. Instead try: "You seem like you are having a tough day. How can I help?"',
        'Avoid: "You are being too emotional." -- Emotions are not excessive just because you do not share them. Instead try: "I hear you. That sounds really frustrating."',
        'Avoid: "Just calm down." -- This implies they are choosing to be upset. Instead try: "Take your time. I am here."',
        'Avoid: "It is not a big deal." -- What feels small to you may feel overwhelming to them right now. Instead try: "I can see this matters to you."',
        'Avoid: "What do you want me to do about it?" -- This sounds exasperated, not helpful. Instead try: "What would feel supportive right now?"',
      ],
    },
    {
      id: 'edu-6',
      slug: 'cycle-syncing-as-a-team',
      title: 'Cycle Awareness as a Team Effort',
      summary: 'How understanding the cycle can improve your relationship dynamic.',
      category: 'cycle-basics',
      content: [
        'When both partners understand the cycle, it becomes easier to plan, communicate, and support each other. This is not about walking on eggshells. It is about informed compassion.',
        'During high-energy phases (follicular, ovulation), plan dates, trips, or bigger conversations. During lower-energy phases (luteal, menstrual), create space for rest and quieter connection.',
        'This does not mean every day is dictated by the cycle. It means having context for when things feel harder. It is the difference between "What is wrong with you?" and "I know this week is tougher. I have got you."',
        'Cycle awareness is a relationship skill. Like communication or conflict resolution, it improves with practice and intention.',
      ],
    },
  ]
}

export function getEducationCategoryLabel(category: PartnerEducationArticle['category']): string {
  const labels: Record<PartnerEducationArticle['category'], string> = {
    'cycle-basics': 'Cycle Basics',
    'mood-shifts': 'Mood & Emotions',
    'pms-reality': 'PMS & PMDD',
    'support-skills': 'Support Skills',
  }
  return labels[category]
}

export function getEducationCategoryColor(category: PartnerEducationArticle['category']): string {
  const colors: Record<PartnerEducationArticle['category'], string> = {
    'cycle-basics': 'bg-sky-50 text-sky-800 border-sky-200',
    'mood-shifts': 'bg-violet-50 text-violet-800 border-violet-200',
    'pms-reality': 'bg-rose-50 text-rose-800 border-rose-200',
    'support-skills': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  }
  return colors[category]
}
