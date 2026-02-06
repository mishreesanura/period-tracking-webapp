'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, BookOpen, Download } from 'lucide-react'
import { getSimilarityBandLabel } from '@/lib/insights-utils'
import type { PCOSAwareness } from '@/lib/insights-types'

interface PCOSModuleProps {
  awareness: PCOSAwareness
  onExport?: () => void
}

export function InsightsPCOSModule({ awareness, onExport }: PCOSModuleProps) {
  if (!awareness.activated) {
    return null
  }

  const similarityColors = {
    low: 'bg-green-50 border-green-200',
    moderate: 'bg-yellow-50 border-yellow-200',
    higher: 'bg-orange-50 border-orange-200',
  }

  const similarityTextColors = {
    low: 'text-green-800',
    moderate: 'text-yellow-800',
    higher: 'text-orange-800',
  }

  return (
    <Card className={`p-6 border-2 ${similarityColors[awareness.similarityBand]}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">PCOS Pattern Awareness</h3>
            <p className="text-sm text-muted-foreground mt-1">
              We've noticed some patterns worth exploring with your doctor
            </p>
          </div>
        </div>

        {/* Similarity band */}
        <div className="bg-white bg-opacity-50 rounded-lg p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Pattern similarity
          </p>
          <p className={`text-sm font-semibold ${similarityTextColors[awareness.similarityBand]}`}>
            {getSimilarityBandLabel(awareness.similarityBand)}
          </p>
        </div>

        {/* Patterns detected */}
        {awareness.patterns.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Patterns observed:
            </p>
            <div className="space-y-2">
              {awareness.patterns.map((pattern, idx) => (
                <div key={idx} className="bg-white bg-opacity-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground">{pattern.category}</p>
                  <ul className="mt-1 space-y-1">
                    {pattern.patterns.map((p, pidx) => (
                      <li key={pidx} className="text-xs text-muted-foreground">
                        • {p}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">{pattern.duration}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="bg-white bg-opacity-50 rounded-lg p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Why you're seeing this</p>
          <p className="text-sm text-foreground">{awareness.explanation}</p>
        </div>

        {/* Important message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Important:</strong> These patterns can have many causes. Only a doctor can diagnose PCOS. This
            tool provides observations, not diagnosis.
          </p>
        </div>

        {/* Next steps */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Next steps</p>
          <ul className="space-y-2">
            {awareness.nextSteps.map((step, idx) => (
              <li key={idx} className="text-sm text-foreground flex gap-2">
                <span className="text-muted-foreground">→</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-current border-opacity-10">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 bg-transparent"
            onClick={() =>
              window.open('https://www.verywellhealth.com/pcos-myths-and-facts-5104689', '_blank')
            }
          >
            <BookOpen className="h-4 w-4" />
            Learn about PCOS
          </Button>
          {onExport && (
            <Button size="sm" className="flex-1 gap-2" onClick={onExport}>
              <Download className="h-4 w-4" />
              Export for Doctor
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
