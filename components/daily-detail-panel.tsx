'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { calculateCyclePhase, getPhaseLabel } from '@/lib/cycle-utils'

interface DailyDetailPanelProps {
  date: Date
  onClose: () => void
}

export function DailyDetailPanel({ date, onClose }: DailyDetailPanelProps) {
  const [flowLevel, setFlowLevel] = useState<'light' | 'medium' | 'heavy' | null>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [mood, setMood] = useState<string | null>(null)
  const [notes, setNotes] = useState('')

  const cycleStartDate = new Date('2024-12-15')
  const cycleData = calculateCyclePhase(date, cycleStartDate, 28, 5)
  const phaseLabel = getPhaseLabel(cycleData.phase)

  const symptoms = [
    'Cramps',
    'Headache',
    'Fatigue',
    'Bloating',
    'Mood swings',
    'Acne',
    'Tender breasts',
    'Nausea',
  ]

  const moods = ['Happy', 'Sad', 'Anxious', 'Calm', 'Energetic', 'Tired']

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    )
  }

  const dateFormatted = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Drawer open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="max-h-screen">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-2xl">{dateFormatted}</DrawerTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {`${cycleData.isPredicted ? 'Predicted' : 'Confirmed'}: ${phaseLabel}`}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto flex-1 p-6">
          {/* Flow Level */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">Flow Level</h3>
            <div className="flex gap-2">
              {(['light', 'medium', 'heavy'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setFlowLevel(flowLevel === level ? null : level)}
                  className={`
                    flex-1 py-2 px-3 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      flowLevel === level
                        ? 'bg-[hsl(var(--cycle-period))] text-white'
                        : 'bg-muted text-muted-foreground hover:bg-secondary'
                    }
                  `}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">Symptoms</h3>
            <div className="grid grid-cols-2 gap-2">
              {symptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`
                    py-2 px-3 rounded-lg text-sm font-medium
                    transition-all duration-200 text-left
                    ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-[hsl(var(--cycle-period-light))] text-foreground border border-[hsl(var(--cycle-period))]'
                        : 'bg-muted text-muted-foreground hover:bg-secondary'
                    }
                  `}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">How are you feeling?</h3>
            <div className="grid grid-cols-3 gap-2">
              {moods.map((moodOption) => (
                <button
                  key={moodOption}
                  onClick={() => setMood(mood === moodOption ? null : moodOption)}
                  className={`
                    py-2 px-3 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      mood === moodOption
                        ? 'bg-[hsl(var(--cycle-pms))] text-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-secondary'
                    }
                  `}
                >
                  {moodOption}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">Notes (Optional)</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
          </div>

          {/* Save Button */}
          <div className="sticky bottom-0 bg-background pt-4 border-t">
            <Button
              onClick={onClose}
              className="w-full bg-[hsl(var(--cycle-period))] text-white hover:opacity-90"
            >
              Save Entry
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
