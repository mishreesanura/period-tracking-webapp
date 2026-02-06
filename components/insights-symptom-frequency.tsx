'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SymptomFrequency } from '@/lib/insights-types'

interface SymptomFrequencyMapProps {
  symptoms: SymptomFrequency[]
}

export function InsightsSymptomFrequency({ symptoms }: SymptomFrequencyMapProps) {
  const getTrendBadge = (trend: string) => {
    if (trend === 'increasing') return <Badge className="bg-orange-100 text-orange-800">Increasing</Badge>
    if (trend === 'decreasing') return <Badge className="bg-green-100 text-green-800">Improving</Badge>
    return <Badge className="bg-blue-100 text-blue-800">Stable</Badge>
  }

  const getFrequencyColor = (freq: number): string => {
    if (freq >= 80) return 'bg-rose-200'
    if (freq >= 60) return 'bg-orange-200'
    if (freq >= 40) return 'bg-yellow-200'
    if (freq >= 20) return 'bg-blue-100'
    return 'bg-gray-100'
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Symptom Frequency Map</h3>
          <p className="text-sm text-muted-foreground">
            How often symptoms appear across your cycle phases
          </p>
        </div>

        <div className="space-y-4">
          {symptoms.map((symptom) => (
            <div key={symptom.symptom} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{symptom.symptom}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{symptom.frequency}%</span>
                  {getTrendBadge(symptom.trend)}
                </div>
              </div>

              {/* Frequency bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getFrequencyColor(symptom.frequency)}`}
                  style={{ width: `${symptom.frequency}%` }}
                />
              </div>

              {/* Phase breakdown */}
              <div className="flex gap-2 flex-wrap">
                {Object.entries(symptom.byPhase)
                  .filter(([, freq]) => freq > 0)
                  .map(([phase, freq]) => (
                    <div
                      key={phase}
                      className="text-xs bg-muted/60 px-2 py-1 rounded text-muted-foreground"
                    >
                      {phase}: {freq}%
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Higher percentages mean the symptom appears more frequently across your cycle. Percentages by phase
          show when symptoms are most common.
        </p>
      </div>
    </Card>
  )
}
