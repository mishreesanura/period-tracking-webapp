import type {
  CareSuggestion,
  CyclePhase,
  TimeOfDay,
  SuggestionCategory,
} from './care-types'

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

export function getCategoryColor(
  category: SuggestionCategory,
): string {
  const colors: Record<SuggestionCategory, string> = {
    'emotional-care': 'bg-purple-50 border-purple-200 text-purple-900',
    'nutrition': 'bg-green-50 border-green-200 text-green-900',
    'physical-care': 'bg-blue-50 border-blue-200 text-blue-900',
    'rest': 'bg-indigo-50 border-indigo-200 text-indigo-900',
    'mental-checkin': 'bg-pink-50 border-pink-200 text-pink-900',
  }
  return colors[category]
}

export function getCategoryLabel(
  category: SuggestionCategory,
): string {
  const labels: Record<SuggestionCategory, string> = {
    'emotional-care': 'Emotional Care',
    'nutrition': 'Nutrition & Hydration',
    'physical-care': 'Physical Care',
    'rest': 'Rest & Sleep',
    'mental-checkin': 'Mental Check-in',
  }
  return labels[category]
}

export function getCyclePhaseSuggestions(
  phase: CyclePhase,
  timeOfDay: TimeOfDay,
): CareSuggestion[] {
  // Period phase - focus on rest and comfort
  if (phase === 'period') {
    if (timeOfDay === 'morning') {
      return [
        {
          id: 'period-morning-1',
          category: 'emotional-care',
          empathy:
            'Starting the day during your period can feel heavy. Here\'s something gentle:',
          suggestion:
            'Give yourself permission to move slowly today. No rushing.',
          reason:
            'Your body is in a natural renewal phase. Gentle pacing honors that.',
          timeOfDay: 'morning',
          cyclePhase: 'period',
          createdAt: new Date(),
        },
        {
          id: 'period-morning-2',
          category: 'nutrition',
          empathy:
            'Nourishing yourself well during this time matters.',
          suggestion:
            'Have something warm and iron-rich when you can—warm oats, lentil soup, or scrambled eggs.',
          reason:
            'Your body needs extra care. Iron-rich foods can help with energy.',
          timeOfDay: 'morning',
          cyclePhase: 'period',
          createdAt: new Date(),
        },
        {
          id: 'period-morning-3',
          category: 'rest',
          empathy:
            'Sleep might feel different right now.',
          suggestion:
            'If you need more rest than usual, that\'s completely normal. Honor it.',
          reason:
            'Your body is doing important work. More sleep is a feature, not a flaw.',
          timeOfDay: 'morning',
          cyclePhase: 'period',
          createdAt: new Date(),
        },
      ]
    }

    if (timeOfDay === 'afternoon') {
      return [
        {
          id: 'period-afternoon-1',
          category: 'physical-care',
          empathy:
            'How\'s your energy mid-day?',
          suggestion:
            'A slow walk or gentle stretching might ease any discomfort.',
          reason:
            'Movement can help with cramping without pushing yourself.',
          timeOfDay: 'afternoon',
          cyclePhase: 'period',
          createdAt: new Date(),
        },
        {
          id: 'period-afternoon-2',
          category: 'nutrition',
          empathy: 'Keep hydrating gently.',
          suggestion:
            'Drink some water or herbal tea. Warmth can help.',
          reason:
            'Staying hydrated supports your body during this time.',
          timeOfDay: 'afternoon',
          cyclePhase: 'period',
          createdAt: new Date(),
        },
      ]
    }

    // evening
    return [
      {
        id: 'period-evening-1',
        category: 'rest',
        empathy: 'Evening is your time to wind down.',
        suggestion:
          'Create a cozy space. Soft blanket, warm drink, something that feels safe.',
        reason:
          'Rest and comfort aren\'t luxuries during your period. They\'re essential.',
        timeOfDay: 'evening',
        cyclePhase: 'period',
        createdAt: new Date(),
      },
      {
        id: 'period-evening-2',
        category: 'mental-checkin',
        empathy: 'How are you feeling emotionally?',
        suggestion:
          'Take a few minutes to check in with yourself. No judgment, just honesty.',
        reason:
          'You deserve to know how you\'re actually feeling.',
        timeOfDay: 'evening',
        cyclePhase: 'period',
        createdAt: new Date(),
      },
    ]
  }

  // Follicular phase - gentle energy building
  if (phase === 'follicular') {
    if (timeOfDay === 'morning') {
      return [
        {
          id: 'follicular-morning-1',
          category: 'emotional-care',
          empathy:
            'This phase often brings a sense of renewal.',
          suggestion:
            'If you\'re feeling a bit more energy, that\'s real. Honor it gently.',
          reason:
            'Your body is rebuilding. Gentle curiosity about what you want is good.',
          timeOfDay: 'morning',
          cyclePhase: 'follicular',
          createdAt: new Date(),
        },
      ]
    }

    if (timeOfDay === 'afternoon') {
      return [
        {
          id: 'follicular-afternoon-1',
          category: 'physical-care',
          empathy:
            'You might feel ready for gentle activity.',
          suggestion:
            'A walk, yoga, or whatever movement feels good—listen to your body.',
          reason:
            'This phase is often more forgiving for movement.',
          timeOfDay: 'afternoon',
          cyclePhase: 'follicular',
          createdAt: new Date(),
        },
      ]
    }

    return [
      {
        id: 'follicular-evening-1',
        category: 'nutrition',
        empathy: 'Nourishing yourself well supports this phase.',
        suggestion:
          'Fresh vegetables, lean proteins, and foods you actually enjoy.',
        reason:
          'Your body is rebuilding. Good nutrition matters now.',
        timeOfDay: 'evening',
        cyclePhase: 'follicular',
        createdAt: new Date(),
      },
    ]
  }

  // Ovulation phase - energy and connection
  if (phase === 'ovulation') {
    if (timeOfDay === 'morning') {
      return [
        {
          id: 'ovulation-morning-1',
          category: 'emotional-care',
          empathy:
            'This phase often brings clarity and social energy.',
          suggestion:
            'If you\'re feeling chatty or social, that\'s not random. It\'s biology.',
          reason:
            'Your body naturally opens up during ovulation. Let it.',
          timeOfDay: 'morning',
          cyclePhase: 'ovulation',
          createdAt: new Date(),
        },
      ]
    }

    if (timeOfDay === 'afternoon') {
      return [
        {
          id: 'ovulation-afternoon-1',
          category: 'physical-care',
          empathy:
            'Energy is usually higher now.',
          suggestion:
            'If it feels right, try a more challenging workout or activity.',
          reason:
            'Your body can handle more intensity during this window.',
          timeOfDay: 'afternoon',
          cyclePhase: 'ovulation',
          createdAt: new Date(),
        },
      ]
    }

    return [
      {
        id: 'ovulation-evening-1',
        category: 'emotional-care',
        empathy:
          'Connection matters to you right now.',
        suggestion:
          'If you can, spend time with people you care about. Even a text counts.',
        reason:
          'This phase naturally draws us toward connection.',
        timeOfDay: 'evening',
        cyclePhase: 'ovulation',
        createdAt: new Date(),
      },
    ]
  }

  // Luteal/PMS phase - protection and ease
  if (phase === 'luteal-pms') {
    if (timeOfDay === 'morning') {
      return [
        {
          id: 'luteal-morning-1',
          category: 'emotional-care',
          empathy:
            'PMS can amplify emotions. That\'s normal.',
          suggestion:
            'Be extra gentle with yourself today. Your nervous system is more sensitive.',
          reason:
            'Hormonal shifts are real. Protecting your peace matters.',
          timeOfDay: 'morning',
          cyclePhase: 'luteal-pms',
          createdAt: new Date(),
        },
        {
          id: 'luteal-morning-2',
          category: 'nutrition',
          empathy: 'Your body needs specific support now.',
          suggestion:
            'Eat more calcium, magnesium-rich foods, and B vitamins. Think leafy greens, nuts, whole grains.',
          reason:
            'These nutrients help ease PMS symptoms naturally.',
          timeOfDay: 'morning',
          cyclePhase: 'luteal-pms',
          createdAt: new Date(),
        },
      ]
    }

    if (timeOfDay === 'afternoon') {
      return [
        {
          id: 'luteal-afternoon-1',
          category: 'rest',
          empathy:
            'Fatigue might be hitting harder right now.',
          suggestion:
            'A short rest or quiet time is not laziness. It\'s necessary.',
          reason:
            'Your energy dips in this phase. Honoring that is self-care.',
          timeOfDay: 'afternoon',
          cyclePhase: 'luteal-pms',
          createdAt: new Date(),
        },
      ]
    }

    // evening
    return [
      {
        id: 'luteal-evening-1',
        category: 'mental-checkin',
        empathy:
          'Your internal world might feel louder right now.',
        suggestion:
          'Journal, sit quietly, or just notice what\'s coming up. No fixing required.',
        reason:
          'This phase gifts you clarity. Listen to it.',
        timeOfDay: 'evening',
        cyclePhase: 'luteal-pms',
        createdAt: new Date(),
      },
      {
        id: 'luteal-evening-2',
        category: 'rest',
        empathy: 'Wind down mindfully.',
        suggestion:
          'Create boundaries around your evening. Protect sleep time.',
        reason:
          'Good rest now prevents tomorrow\'s overwhelm.',
        timeOfDay: 'evening',
        cyclePhase: 'luteal-pms',
        createdAt: new Date(),
      },
    ]
  }

  // Default suggestions if phase is unknown
  return [
    {
      id: 'default-1',
      category: 'emotional-care',
      empathy: 'Take a moment for yourself today.',
      suggestion:
        'Five minutes of quiet can reset your nervous system.',
      reason: 'You deserve to check in with how you\'re really feeling.',
      createdAt: new Date(),
    },
    {
      id: 'default-2',
      category: 'nutrition',
      empathy: 'Nourish yourself well.',
      suggestion:
        'Eat something that both fills you and feels good.',
      reason: 'Food is more than fuel. It\'s an act of self-care.',
      createdAt: new Date(),
    },
  ]
}

export function getDefaultSuggestions(
  timeOfDay: TimeOfDay,
): CareSuggestion[] {
  if (timeOfDay === 'morning') {
    return [
      {
        id: 'default-morning-1',
        category: 'emotional-care',
        empathy: 'Starting the day deserves intention.',
        suggestion:
          'Set one small intention for today. Just one.',
        reason: 'Clarity early makes the day easier.',
        timeOfDay: 'morning',
        createdAt: new Date(),
      },
      {
        id: 'default-morning-2',
        category: 'nutrition',
        empathy: 'Your morning sets the tone.',
        suggestion:
          'Eat something nourishing. Doesn\'t have to be perfect.',
        reason: 'Stable blood sugar helps everything else.',
        timeOfDay: 'morning',
        createdAt: new Date(),
      },
    ]
  }

  if (timeOfDay === 'afternoon') {
    return [
      {
        id: 'default-afternoon-1',
        category: 'physical-care',
        empathy: 'Mid-day slump is real.',
        suggestion:
          'A 5-minute stretch or short walk can shift your energy.',
        reason: 'Movement interrupts fatigue.',
        timeOfDay: 'afternoon',
        createdAt: new Date(),
      },
      {
        id: 'default-afternoon-2',
        category: 'nutrition',
        empathy: 'Keep yourself steady.',
        suggestion: 'Hydrate. Have a snack with protein.',
        reason: 'Sustained energy prevents crashes.',
        timeOfDay: 'afternoon',
        createdAt: new Date(),
      },
    ]
  }

  // evening
  return [
    {
      id: 'default-evening-1',
      category: 'rest',
      empathy: 'Evening is for unwinding.',
      suggestion:
        'Step away from screens 30 minutes before bed if you can.',
      reason: 'Your nervous system needs a real transition to rest.',
      timeOfDay: 'evening',
      createdAt: new Date(),
    },
    {
      id: 'default-evening-2',
      category: 'mental-checkin',
      empathy: 'Reflection matters.',
      suggestion:
        'One thing you did okay today. Just one. That counts.',
      reason: 'Self-compassion helps you rest easier.',
      timeOfDay: 'evening',
      createdAt: new Date(),
    },
  ]
}
