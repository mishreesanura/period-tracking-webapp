import type {
  CareSuggestion,
  CyclePhase,
  TimeOfDay,
  SuggestionCategory,
} from "./care-types";

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export function getCategoryColor(category: SuggestionCategory): string {
  const colors: Record<SuggestionCategory, string> = {
    // Pink/Purple/Pastel Theme
    "emotional-care": "bg-purple-50 border-purple-100 text-purple-700",
    nutrition: "bg-pink-50 border-pink-100 text-pink-700",
    "physical-care": "bg-rose-50 border-rose-100 text-rose-700",
    rest: "bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700",
    "mental-checkin": "bg-violet-50 border-violet-100 text-violet-700",
  };
  return colors[category];
}

export function getCategoryLabel(category: SuggestionCategory): string {
  const labels: Record<SuggestionCategory, string> = {
    "emotional-care": "Emotional Care",
    nutrition: "Nutrition & Hydration",
    "physical-care": "Physical Care",
    rest: "Rest & Sleep",
    "mental-checkin": "Mental Check-in",
  };
  return labels[category];
}

export function getCyclePhaseSuggestions(
  phase: CyclePhase,
  timeOfDay: TimeOfDay,
): CareSuggestion[] {
  // Period phase - focus on rest and comfort
  if (phase === "period") {
    if (timeOfDay === "morning") {
      return [
        {
          id: "period-morning-1",
          category: "emotional-care",
          empathy: "Starting the day during your period can feel heavy.",
          suggestion:
            "Give yourself permission to move slowly today. No rushing.",
          reason:
            "Your body is in a natural renewal phase. Gentle pacing honors that.",
          timeOfDay: "morning",
          cyclePhase: "period",
          createdAt: new Date(),
        },
        {
          id: "period-morning-2",
          category: "nutrition",
          empathy: "Nourishing yourself well matters right now.",
          suggestion:
            "Try warm oats, lentil soup, or scrambled eggs with spinach.",
          reason: "Iron-rich foods help replenish your energy stores.",
          timeOfDay: "morning",
          cyclePhase: "period",
          createdAt: new Date(),
        },
        {
          id: "period-morning-3",
          category: "rest",
          empathy: "Sleep might feel different right now.",
          suggestion:
            "If you need an extra 20 minutes of rest, take it without guilt.",
          reason:
            "Your body is doing hard work internally. Rest is productive.",
          timeOfDay: "morning",
          cyclePhase: "period",
          createdAt: new Date(),
        },
        {
          id: "period-morning-4",
          category: "physical-care",
          empathy: "Movement might feel distant.",
          suggestion:
            "A gentle forward fold or child’s pose can release lower back tension.",
          reason: "Gentle compression helps soothe cramping and bloating.",
          timeOfDay: "morning",
          cyclePhase: "period",
          createdAt: new Date(),
        },
        {
          id: "period-morning-5",
          category: "nutrition",
          empathy: "Hydration feels boring but helps.",
          suggestion:
            "Warm water with lemon or ginger tea is gentler than cold water.",
          reason:
            "Warm liquids aid circulation and can ease abdominal tightness.",
          timeOfDay: "morning",
          cyclePhase: "period",
          createdAt: new Date(),
        },
        {
          id: "period-morning-6",
          category: "mental-checkin",
          empathy: "Brain fog is common today.",
          suggestion: "Simplify your to-do list. Pick just top 3 priorities.",
          reason: "Lowering cognitive load reduces stress hormones.",
          timeOfDay: "morning",
          cyclePhase: "period",
          createdAt: new Date(),
        },
      ];
    }

    if (timeOfDay === "afternoon") {
      return [
        {
          id: "period-afternoon-1",
          category: "physical-care",
          empathy: "Energy often dips in the afternoon.",
          suggestion: "A slow walk outside or just standing in sunlight helps.",
          reason: "Natural light regulates mood even when energy is low.",
          timeOfDay: "afternoon",
          cyclePhase: "period",
          createdAt: new Date(),
        },
        {
          id: "period-afternoon-2",
          category: "nutrition",
          empathy: "Cravings might be showing up.",
          suggestion: "Dark chocolate (70%+) serves both craving and need.",
          reason: "Magnesium in chocolate helps relax muscles naturally.",
          timeOfDay: "afternoon",
          cyclePhase: "period",
          createdAt: new Date(),
        },
        {
          id: "period-afternoon-3",
          category: "emotional-care",
          empathy: "Feeling sensitive isn’t a weakness.",
          suggestion:
            "Wrap up in a blanket or wear your most comfortable sweater.",
          reason:
            "Physical warmth and softness signal safety to the nervous system.",
          timeOfDay: "afternoon",
          cyclePhase: "period",
          createdAt: new Date(),
        },
        {
          id: "period-afternoon-4",
          category: "rest",
          empathy: "Your body is working overtime.",
          suggestion:
            "Lie down for 10 minutes with legs up the wall if possible.",
          reason: "This restores circulation and rests the lower back.",
          timeOfDay: "afternoon",
          cyclePhase: "period",
          createdAt: new Date(),
        },
      ];
    }

    // evening
    return [
      {
        id: "period-evening-1",
        category: "rest",
        empathy: "Evening is for deep restoration.",
        suggestion: 'Create a "nest" tonight—pillows, blankets, low light.',
        reason:
          "Rest isn’t a luxury during your period; it’s a biological need.",
        timeOfDay: "evening",
        cyclePhase: "period",
        createdAt: new Date(),
      },
      {
        id: "period-evening-2",
        category: "mental-checkin",
        empathy: "Emotions may surface in the quiet.",
        suggestion: "Journal one thing your body needs from you right now.",
        reason: "Listening builds trust with your own body.",
        timeOfDay: "evening",
        cyclePhase: "period",
        createdAt: new Date(),
      },
      {
        id: "period-evening-3",
        category: "nutrition",
        empathy: "Comfort is key before bed.",
        suggestion: "Magnesium tea or warm golden milk.",
        reason: "Promotes deeper sleep and relaxes uterine muscles.",
        timeOfDay: "evening",
        cyclePhase: "period",
        createdAt: new Date(),
      },
      {
        id: "period-evening-4",
        category: "emotional-care",
        empathy: "Be gentle with your expectations.",
        suggestion: "Cancel plans if you need to. Saying no is self-care.",
        reason: "Protecting your energy now leads to better energy later.",
        timeOfDay: "evening",
        cyclePhase: "period",
        createdAt: new Date(),
      },
    ];
  }

  // Follicular, Ovulation, Luteal logic could go here, but focusing on DEFAULT/UNKNOWN
  // as per current usage to allow "many" to show up regardless of cycle tracking depth

  if (timeOfDay === "morning") {
    return [
      {
        id: "default-morning-1",
        category: "emotional-care",
        empathy: "Mornings set the tone, but they don’t have to be perfect.",
        suggestion: "Before scrolling, take three deep breaths. Just three.",
        reason: "This disrupts the cortisol spike of waking up.",
        timeOfDay: "morning",
        createdAt: new Date(),
      },
      {
        id: "default-morning-2",
        category: "nutrition",
        empathy: "Your brain needs fuel to regulate emotions.",
        suggestion: "Add a protein to your breakfast—eggs, yogurt, or nuts.",
        reason: "Protein stabilizes blood sugar, preventing mood swings later.",
        timeOfDay: "morning",
        createdAt: new Date(),
      },
      {
        id: "default-morning-3",
        category: "physical-care",
        empathy: "Stiffness is normal after sleep.",
        suggestion: "A big overhead stretch, reaching for the ceiling.",
        reason: 'Expands the ribcage and signals "awake" to your body.',
        timeOfDay: "morning",
        createdAt: new Date(),
      },
      {
        id: "default-morning-4",
        category: "mental-checkin",
        empathy: "The to-do list might feel loud.",
        suggestion:
          'Ask yourself: "What is one thing that would make today feel successful?"',
        reason: "Focusing on one win reduces overwhelm immediately.",
        timeOfDay: "morning",
        createdAt: new Date(),
      },
      {
        id: "default-morning-5",
        category: "nutrition",
        empathy: "Hydration wakes up your brain.",
        suggestion: "Drink a full glass of water before your coffee or tea.",
        reason: "Rehydrating tissues improves cognitive function instantly.",
        timeOfDay: "morning",
        createdAt: new Date(),
      },
      {
        id: "default-morning-6",
        category: "rest",
        empathy: "You don’t have to rush immediately.",
        suggestion:
          "Take 2 minutes to just sit with your coffee/tea without a screen.",
        reason: 'Savoring creates a "micro-rest" moment before the day starts.',
        timeOfDay: "morning",
        createdAt: new Date(),
      },
    ];
  }

  if (timeOfDay === "afternoon") {
    return [
      {
        id: "default-afternoon-1",
        category: "physical-care",
        empathy: "The afternoon slump is a biological rhythm, not laziness.",
        suggestion:
          "Stand up and shake out your hands and feet for 30 seconds.",
        reason: "Physical movement resets your nervous system state.",
        timeOfDay: "afternoon",
        createdAt: new Date(),
      },
      {
        id: "default-afternoon-2",
        category: "nutrition",
        empathy: "Energy flagging?",
        suggestion: "Grab a handful of almonds or a piece of fruit.",
        reason: "Fiber and fat provide slow-burning fuel compared to sugar.",
        timeOfDay: "afternoon",
        createdAt: new Date(),
      },
      {
        id: "default-afternoon-3",
        category: "emotional-care",
        empathy: "Work or tasks can accumulate stress.",
        suggestion:
          "Look out a window at something growing/green for 60 seconds.",
        reason: '"Soft attention" on nature lowers blood pressure.',
        timeOfDay: "afternoon",
        createdAt: new Date(),
      },
      {
        id: "default-afternoon-4",
        category: "mental-checkin",
        empathy: "Feeling overwhelmed?",
        suggestion:
          "Do a brain dump. Write down everything looping in your head.",
        reason: "Externalizing thoughts frees up working memory.",
        timeOfDay: "afternoon",
        createdAt: new Date(),
      },
      {
        id: "default-afternoon-5",
        category: "nutrition",
        empathy: "Thirst often masquerades as fatigue.",
        suggestion:
          "Refill your water bottle. Add cucumber or lemon if it helps.",
        reason: "Even mild dehydration cause significant fatigue.",
        timeOfDay: "afternoon",
        createdAt: new Date(),
      },
      {
        id: "default-afternoon-6",
        category: "rest",
        empathy: "Eyes getting tired?",
        suggestion: "Look at a point 20 feet away for 20 seconds.",
        reason: "Relieves eye strain from screens (20-20-20 rule).",
        timeOfDay: "afternoon",
        createdAt: new Date(),
      },
    ];
  }

  // Evening
  return [
    {
      id: "default-evening-1",
      category: "rest",
      empathy: 'Transitioning from "doing" to "being" is hard.',
      suggestion:
        "Change into comfortable clothes immediately upon finishing tasks.",
      reason: "It’s a physical signal to your brain that work is done.",
      timeOfDay: "evening",
      createdAt: new Date(),
    },
    {
      id: "default-evening-2",
      category: "mental-checkin",
      empathy: "The day is done.",
      suggestion: "Acknowledge one hard thing you got through today.",
      reason: "Validation helps close the stress cycle.",
      timeOfDay: "evening",
      createdAt: new Date(),
    },
    {
      id: "default-evening-3",
      category: "nutrition",
      empathy: "Support your sleep system.",
      suggestion: "Finish eating 2-3 hours before bed if possible.",
      reason: "Digestion can interfere with deep sleep cycles.",
      timeOfDay: "evening",
      createdAt: new Date(),
    },
    {
      id: "default-evening-4",
      category: "emotional-care",
      empathy: "Connect with comfort.",
      suggestion: "Read a few pages of a book (real paper, not screen).",
      reason: "It engages the imagination without blue light exposure.",
      timeOfDay: "evening",
      createdAt: new Date(),
    },
    {
      id: "default-evening-5",
      category: "physical-care",
      empathy: "Release the day’s tension.",
      suggestion: "Gentle neck rolls or jaw release exercises.",
      reason: "We hold unconscious stress in the jaw and shoulders.",
      timeOfDay: "evening",
      createdAt: new Date(),
    },
    {
      id: "default-evening-6",
      category: "rest",
      empathy: "Prepare your environment.",
      suggestion: "Dim the lights in your living room an hour before bed.",
      reason: "Simulates sunset and triggers melatonin production.",
      timeOfDay: "evening",
      createdAt: new Date(),
    },
  ];
}

export function getDefaultSuggestions(timeOfDay: TimeOfDay): CareSuggestion[] {
  return getCyclePhaseSuggestions("unknown", timeOfDay);
}
