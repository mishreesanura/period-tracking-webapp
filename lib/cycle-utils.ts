export type CyclePhase = 'period' | 'spotting' | 'follicular' | 'ovulation' | 'luteal' | 'pms' | 'no-data'

export interface CycleData {
  phase: CyclePhase
  dayInCycle: number
  isPredicted: boolean
}

export function calculateCyclePhase(
  date: Date,
  cycleStartDate: Date,
  cycleLengthDays: number = 28,
  periodDurationDays: number = 5
): CycleData {
  const dateNormalized = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const cycleStartNormalized = new Date(
    cycleStartDate.getFullYear(),
    cycleStartDate.getMonth(),
    cycleStartDate.getDate()
  )

  const daysDiff = Math.floor(
    (dateNormalized.getTime() - cycleStartNormalized.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysDiff < 0) {
    return {
      phase: 'no-data',
      dayInCycle: 0,
      isPredicted: false,
    }
  }

  const dayInCycle = daysDiff % cycleLengthDays

  let phase: CyclePhase = 'no-data'
  let isPredicted = false

  if (dayInCycle < periodDurationDays) {
    phase = 'period'
    isPredicted = daysDiff > 0 && daysDiff > 4 // First 5 days after start are confirmed
  } else if (dayInCycle === periodDurationDays) {
    phase = 'spotting'
    isPredicted = true
  } else if (dayInCycle < 12) {
    phase = 'follicular'
    isPredicted = true
  } else if (dayInCycle >= 12 && dayInCycle <= 16) {
    phase = 'ovulation'
    isPredicted = true
  } else if (dayInCycle > 16 && dayInCycle < 22) {
    phase = 'luteal'
    isPredicted = true
  } else {
    phase = 'pms'
    isPredicted = true
  }

  return {
    phase,
    dayInCycle,
    isPredicted,
  }
}

export function getPhaseColor(phase: CyclePhase, isPredicted: boolean): string {
  const colorMap: Record<CyclePhase, { normal: string; predicted: string }> = {
    period: {
      normal: 'bg-[hsl(var(--cycle-period))]',
      predicted: 'bg-[hsl(var(--cycle-period-light))]',
    },
    spotting: {
      normal: 'bg-[hsl(var(--cycle-spotting))]',
      predicted: 'bg-[hsl(var(--cycle-spotting))]',
    },
    follicular: {
      normal: 'bg-[hsl(var(--cycle-safe))]',
      predicted: 'bg-[hsl(var(--cycle-safe))]',
    },
    ovulation: {
      normal: 'bg-[hsl(var(--cycle-fertile))]',
      predicted: 'bg-[hsl(var(--cycle-ovulation))]',
    },
    luteal: {
      normal: 'bg-[hsl(var(--cycle-safe))]',
      predicted: 'bg-[hsl(var(--cycle-safe))]',
    },
    pms: {
      normal: 'bg-[hsl(var(--cycle-pms))]',
      predicted: 'bg-[hsl(var(--cycle-pms))]',
    },
    'no-data': {
      normal: 'bg-[hsl(var(--cycle-no-data))]',
      predicted: 'bg-[hsl(var(--cycle-no-data))]',
    },
  }

  return colorMap[phase][isPredicted ? 'predicted' : 'normal']
}

export function getPhaseLabel(phase: CyclePhase): string {
  const labels: Record<CyclePhase, string> = {
    period: 'Period',
    spotting: 'Spotting',
    follicular: 'Follicular',
    ovulation: 'Ovulation',
    luteal: 'Luteal',
    pms: 'PMS',
    'no-data': 'No Data',
  }
  return labels[phase]
}
