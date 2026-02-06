'use client'

import { Card } from '@/components/ui/card'
import { getRiskZoneColor, getRiskZoneIcon } from '@/lib/insights-utils'
import type { RiskSignal } from '@/lib/insights-types'

interface RiskSignalsProps {
  signal: RiskSignal
}

export function InsightsRiskSignals({ signal }: RiskSignalsProps) {
  return (
    <Card className={`p-6 border-2 ${getRiskZoneColor(signal.zone)}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getRiskZoneIcon(signal.zone)}</span>
          <div>
            <h3 className="font-semibold text-foreground capitalize">
              {signal.zone === 'stable'
                ? 'Stable Patterns'
                : signal.zone === 'monitor'
                  ? 'Monitor-Worthy Patterns'
                  : 'Consider Professional Input'}
            </h3>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground">{signal.description}</p>

        {signal.patterns.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Patterns detected:
            </p>
            <ul className="space-y-1">
              {signal.patterns.map((pattern, idx) => (
                <li key={idx} className="text-sm text-foreground flex gap-2">
                  <span className="text-muted-foreground">→</span>
                  {pattern}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-3 border-t border-current border-opacity-20">
          <p className="text-xs text-foreground opacity-75">
            {signal.zone === 'consider'
              ? 'If patterns persist, consider scheduling a check-up with your healthcare provider.'
              : signal.zone === 'monitor'
                ? 'Keep tracking these patterns to understand what might be causing changes.'
                : 'Keep up the good work tracking your health!'}
          </p>
        </div>
      </div>
    </Card>
  )
}
