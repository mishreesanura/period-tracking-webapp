'use client'

import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CycleLegende } from './cycle-legend'
import { MonthlyCalendarView } from './monthly-calendar-view'
import { WeeklyCalendarView } from './weekly-calendar-view'
import { DailyDetailPanel } from './daily-detail-panel'
import { calculateCyclePhase, type CycleData } from '@/lib/cycle-utils'

type CalendarView = 'monthly' | 'weekly'

interface CycleDayData {
  date: Date
  phase: CycleData['phase']
  isPredicted: boolean
  hasFlowLogged: boolean
  hasSymptoms: boolean
  hasNote: boolean
  flowLevel?: 'light' | 'medium' | 'heavy'
  symptoms?: string[]
  mood?: string
  notes?: string
}

export function CycleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState<CalendarView>('monthly')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [cycleStartDate] = useState(new Date('2024-12-15'))
  const [cycleLengthDays] = useState(28)
  const [periodDurationDays] = useState(5)

  const calendarData = useMemo(() => {
    const data: Map<string, CycleDayData> = new Map()
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      const dateStr = date.toISOString().split('T')[0]
      
      const cycleData = calculateCyclePhase(date, cycleStartDate, cycleLengthDays, periodDurationDays)
      
      data.set(dateStr, {
        date,
        phase: cycleData.phase,
        isPredicted: cycleData.isPredicted,
        hasFlowLogged: false,
        hasSymptoms: false,
        hasNote: false,
      })
    }

    return data
  }, [currentMonth, cycleStartDate, cycleLengthDays, periodDurationDays])

  const today = new Date()
  const daysDiff = Math.ceil(
    (new Date(cycleStartDate.getFullYear(), cycleStartDate.getMonth(), cycleStartDate.getDate() + cycleLengthDays).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  const getContextMessage = () => {
    if (daysDiff <= 0) return 'Period expected now'
    if (daysDiff === 1) return 'Period expected tomorrow'
    if (daysDiff <= 3) return `Period expected in ${daysDiff} days`
    if (daysDiff <= 7) return `Ovulation window starts in about ${daysDiff - 7} days`
    return 'Cycle tracking active'
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-foreground mb-2">My Cycle</h1>
        <p className="text-base text-muted-foreground">{getContextMessage()}</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={view === 'monthly' ? 'default' : 'outline'}
          onClick={() => setView('monthly')}
          className="rounded-full"
        >
          Monthly
        </Button>
        <Button
          variant={view === 'weekly' ? 'default' : 'outline'}
          onClick={() => setView('weekly')}
          className="rounded-full"
        >
          Weekly
        </Button>
      </div>

      {/* Legend */}
      <CycleLegende className="mb-6" />

      {/* Calendar Card */}
      <Card className="p-6 md:p-8">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
            }
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <h2 className="text-2xl font-semibold text-foreground min-w-64 text-center">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
            }
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Calendar View */}
        {view === 'monthly' ? (
          <MonthlyCalendarView
            currentMonth={currentMonth}
            calendarData={calendarData}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            today={today}
          />
        ) : (
          <WeeklyCalendarView
            currentMonth={currentMonth}
            calendarData={calendarData}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            today={today}
          />
        )}
      </Card>

      {/* Daily Detail Panel */}
      {selectedDate && (
        <DailyDetailPanel
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}
