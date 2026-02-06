import type {
  SkincareCyclePhase,
  SkinPhaseInfo,
  SkincareRoutine,
  RoutineFocus,
} from './skincare-types'
import type { CyclePhase } from './cycle-utils'

export function mapCyclePhaseToSkincare(phase: CyclePhase): SkincareCyclePhase {
  switch (phase) {
    case 'period':
    case 'spotting':
      return 'menstrual'
    case 'follicular':
      return 'follicular'
    case 'ovulation':
      return 'ovulation'
    case 'luteal':
    case 'pms':
      return 'luteal'
    default:
      return 'follicular'
  }
}

export function getSkinPhaseInfo(phase: SkincareCyclePhase): SkinPhaseInfo {
  const phaseInfoMap: Record<SkincareCyclePhase, SkinPhaseInfo> = {
    menstrual: {
      phase: 'menstrual',
      label: 'Menstrual Phase',
      commonSkinState: ['Dry', 'Dull', 'Sensitive'],
      uiCopy: 'Your skin may feel more sensitive today \u2014 keep things simple.',
      routineFocus: ['Gentle cleanser', 'Hydrating moisturizer', 'Minimal or no actives'],
    },
    follicular: {
      phase: 'follicular',
      label: 'Follicular Phase',
      commonSkinState: ['Balanced', 'Clearer', 'Healing'],
      uiCopy: 'Your skin may feel more resilient \u2014 a good time to reset.',
      routineFocus: ['Regular cleansing', 'Light exfoliation (optional)', 'Hydration'],
    },
    ovulation: {
      phase: 'ovulation',
      label: 'Ovulation Phase',
      commonSkinState: ['Glowy', 'Oily', 'Active'],
      uiCopy: 'Your skin may be at its glowiest right now.',
      routineFocus: ['Gentle cleansing', 'Oil control if needed', 'SPF emphasis'],
    },
    luteal: {
      phase: 'luteal',
      label: 'Luteal / PMS Phase',
      commonSkinState: ['Breakouts', 'Oiliness', 'Inflammation'],
      uiCopy: 'Breakouts around this phase are common \u2014 be kind to your skin.',
      routineFocus: ['Non-irritating acne care', 'Barrier protection', 'Avoid over-exfoliation'],
    },
  }

  return phaseInfoMap[phase]
}

export function getPhaseRoutines(phase: SkincareCyclePhase): SkincareRoutine[] {
  const routineMap: Record<SkincareCyclePhase, SkincareRoutine[]> = {
    menstrual: [
      {
        id: 'menstrual-am',
        timing: 'am',
        title: 'Keep It Gentle',
        focusTags: ['hydration', 'calm'],
        contextMessage: 'Designed for your current cycle phase',
        cyclePhase: 'menstrual',
        steps: [
          {
            name: 'Cleanse',
            description: 'Use a gentle, cream-based cleanser. Avoid anything foaming or stripping.',
            productType: 'Cream cleanser',
          },
          {
            name: 'Moisturize',
            description: 'Apply a rich, hydrating moisturizer. Your skin needs extra nourishment right now.',
            productType: 'Hydrating moisturizer',
          },
          {
            name: 'Protect',
            description: 'Apply SPF even on low-energy days. A mineral sunscreen is gentle on sensitive skin.',
            productType: 'Mineral SPF',
          },
        ],
      },
      {
        id: 'menstrual-pm',
        timing: 'pm',
        title: 'Soothe and Rest',
        focusTags: ['soothe', 'hydration'],
        contextMessage: 'A calming routine for sensitive days',
        cyclePhase: 'menstrual',
        steps: [
          {
            name: 'Cleanse',
            description: 'Gently remove the day. A micellar water or oil cleanser works well.',
            productType: 'Micellar water or oil cleanser',
          },
          {
            name: 'Hydrate',
            description: 'Layer a hydrating serum or essence before your moisturizer for extra comfort.',
            productType: 'Hydrating serum',
          },
          {
            name: 'Moisturize',
            description: 'Seal everything in with a rich night cream or sleeping mask.',
            productType: 'Night cream or sleeping mask',
          },
        ],
      },
    ],
    follicular: [
      {
        id: 'follicular-am',
        timing: 'am',
        title: 'Fresh Start',
        focusTags: ['balance', 'hydration'],
        contextMessage: 'Your skin is feeling more resilient',
        cyclePhase: 'follicular',
        steps: [
          {
            name: 'Cleanse',
            description: 'A gentle gel or foam cleanser to start fresh.',
            productType: 'Gel cleanser',
          },
          {
            name: 'Treat (optional)',
            description: 'A light exfoliating toner can support skin renewal. Only if your skin feels ready.',
            productType: 'Exfoliating toner',
          },
          {
            name: 'Moisturize',
            description: 'A lightweight moisturizer suits this balanced phase.',
            productType: 'Lightweight moisturizer',
          },
          {
            name: 'Protect',
            description: 'Daily SPF. Your skin can handle broader spectrum options now.',
            productType: 'SPF',
          },
        ],
      },
      {
        id: 'follicular-pm',
        timing: 'pm',
        title: 'Gentle Reset',
        focusTags: ['balance', 'calm'],
        contextMessage: 'A simple evening routine for balanced skin',
        cyclePhase: 'follicular',
        steps: [
          {
            name: 'Cleanse',
            description: 'Double cleanse if you wore sunscreen or makeup. Otherwise, a single gentle cleanse is fine.',
            productType: 'Cleansing balm + gel cleanser',
          },
          {
            name: 'Moisturize',
            description: 'A nourishing night moisturizer to support your skin while you sleep.',
            productType: 'Night moisturizer',
          },
        ],
      },
    ],
    ovulation: [
      {
        id: 'ovulation-am',
        timing: 'am',
        title: 'Light and Balanced',
        focusTags: ['balance', 'protect'],
        contextMessage: 'Supporting your skin through its most active phase',
        cyclePhase: 'ovulation',
        steps: [
          {
            name: 'Cleanse',
            description: 'A gentle gel cleanser to manage extra oil without stripping.',
            productType: 'Gel cleanser',
          },
          {
            name: 'Balance',
            description: 'A lightweight, oil-free moisturizer or a hydrating serum.',
            productType: 'Oil-free moisturizer',
          },
          {
            name: 'Protect',
            description: 'SPF is especially important now. Choose a lightweight, non-comedogenic formula.',
            productType: 'Lightweight SPF',
          },
        ],
      },
      {
        id: 'ovulation-pm',
        timing: 'pm',
        title: 'Clear and Calm',
        focusTags: ['balance', 'calm'],
        contextMessage: 'Evening care for active skin',
        cyclePhase: 'ovulation',
        steps: [
          {
            name: 'Cleanse',
            description: 'Thorough but gentle cleansing to remove SPF and excess oil.',
            productType: 'Gel or foam cleanser',
          },
          {
            name: 'Treat (optional)',
            description: 'A gentle clarifying toner or serum if oiliness is noticeable. Skip if skin feels fine.',
            productType: 'Clarifying toner',
          },
          {
            name: 'Moisturize',
            description: 'A light gel moisturizer to hydrate without adding extra oil.',
            productType: 'Gel moisturizer',
          },
        ],
      },
    ],
    luteal: [
      {
        id: 'luteal-am',
        timing: 'am',
        title: 'Protect and Support',
        focusTags: ['protect', 'soothe'],
        contextMessage: 'Gentle care for a sensitive time',
        cyclePhase: 'luteal',
        steps: [
          {
            name: 'Cleanse',
            description: 'A soothing, non-foaming cleanser. Avoid anything harsh.',
            productType: 'Cream or gel cleanser',
          },
          {
            name: 'Soothe',
            description: 'If breakouts appear, spot treat gently. No picking, no over-treating.',
            productType: 'Gentle spot treatment',
          },
          {
            name: 'Moisturize',
            description: 'A barrier-supporting moisturizer helps protect your skin from irritation.',
            productType: 'Barrier cream',
          },
          {
            name: 'Protect',
            description: 'SPF daily. Look for formulas that are soothing and non-comedogenic.',
            productType: 'Non-comedogenic SPF',
          },
        ],
      },
      {
        id: 'luteal-pm',
        timing: 'pm',
        title: 'Barrier Care',
        focusTags: ['soothe', 'protect'],
        contextMessage: 'Supporting your skin barrier through hormonal shifts',
        cyclePhase: 'luteal',
        steps: [
          {
            name: 'Cleanse',
            description: 'Gentle double cleanse. Let your skin breathe without stripping.',
            productType: 'Oil cleanser + gentle wash',
          },
          {
            name: 'Treat',
            description: 'A calming serum with ingredients like niacinamide supports the barrier.',
            productType: 'Calming serum',
          },
          {
            name: 'Moisturize',
            description: 'Rich moisturizer to repair and support your skin while you rest.',
            productType: 'Rich night cream',
          },
        ],
      },
    ],
  }

  return routineMap[phase]
}

export function getFocusTagColor(focus: RoutineFocus): string {
  const colorMap: Record<RoutineFocus, string> = {
    hydration: 'bg-sky-100 text-sky-800 border-sky-200',
    calm: 'bg-lavender-100 text-lavender-800 border-lavender-200',
    balance: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    protect: 'bg-amber-100 text-amber-800 border-amber-200',
    soothe: 'bg-rose-100 text-rose-800 border-rose-200',
  }

  // Fallback for any missing keys
  return colorMap[focus] || 'bg-muted text-muted-foreground border-border'
}

export function getFocusTagLabel(focus: RoutineFocus): string {
  const labelMap: Record<RoutineFocus, string> = {
    hydration: 'Hydration',
    calm: 'Calm',
    balance: 'Balance',
    protect: 'Protect',
    soothe: 'Soothe',
  }
  return labelMap[focus]
}

export function getPhaseAccentColor(phase: SkincareCyclePhase): string {
  const colorMap: Record<SkincareCyclePhase, string> = {
    menstrual: 'border-rose-200 bg-rose-50',
    follicular: 'border-emerald-200 bg-emerald-50',
    ovulation: 'border-amber-200 bg-amber-50',
    luteal: 'border-violet-200 bg-violet-50',
  }
  return colorMap[phase]
}

export function getPhaseAccentText(phase: SkincareCyclePhase): string {
  const colorMap: Record<SkincareCyclePhase, string> = {
    menstrual: 'text-rose-700',
    follicular: 'text-emerald-700',
    ovulation: 'text-amber-700',
    luteal: 'text-violet-700',
  }
  return colorMap[phase]
}
