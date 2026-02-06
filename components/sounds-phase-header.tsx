'use client'

import type { SoundsCyclePhase } from '@/lib/sounds-types'
import { getPhaseUICopy, getPhaseAccentColor, getPhaseAccentText } from '@/lib/sounds-utils'

interface SoundsPhaseHeaderProps {
  phase: SoundsCyclePhase
}

const phaseLabels: Record<SoundsCyclePhase, string> = {
  menstrual: 'Menstrual Phase',
  follicular: 'Follicular Phase',
  ovulation: 'Ovulation Phase',
  luteal: 'Luteal / PMS Phase',
}

export function SoundsPhaseHeader({ phase }: SoundsPhaseHeaderProps) {
  return (
    <div className={`rounded-lg border p-5 ${getPhaseAccentColor(phase)}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${getPhaseAccentText(phase)}`}>
        {phaseLabels[phase]}
      </p>
      <p className="text-sm text-foreground">
        {getPhaseUICopy(phase)}
      </p>
    </div>
  )
}
