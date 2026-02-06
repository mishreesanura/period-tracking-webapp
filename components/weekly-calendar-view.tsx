'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPhaseColor } from '@/lib/cycle-utils'

interface CycleDayData {
  date: Date
  phase: any
  isPredicted: boolean
  hasFlowLogged: boolean
  hasSymptoms: boolean
  hasNote: boolean
}

interface WeeklyCalendarViewProps {
  currentMonth: Date
  calendarData: Map<string, CycleDayData>
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  today: Date
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function WeeklyCalendarView({
  currentMonth,
  calendarData,
  selectedDate,
  onDateSelect,
  today,
}: WeeklyCalendarViewProps) {
  const [weekOffset, setWeekOffset] = useState(0)

  // Get the Monday of the current week
  const getWeekStart = (baseDate: Date, offset: number) => {
    const date = new Date(baseDate)
    date.setDate(date.getDate() + offset * 7)
    const dayOfWeek = date.getDay()
    const daysToGoBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    date.setDate(date.getDate() - daysToGoBack)
    return date
  }

  const weekStart = getWeekStart(today, weekOffset)
  const weekDates: Date[] = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart)
    date.setDate(date.getDate() + i)
    weekDates.push(date)
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  return (
    <div className="w-full">
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset(weekOffset - 1)}
          aria-label="Previous week"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm text-muted-foreground min-w-48 text-center">
          {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} −{' '}
          {new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setWeekOffset(weekOffset + 1)}
          aria-label="Next week"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const dateStr = date.toISOString().split('T')[0]
          const dayData = calendarData.get(dateStr)
          const isCurrentDay = isToday(date)
          const isSelectedDay = isSelected(date)

          return (
            <div key={index} className="flex flex-col items-center">
              {/* Weekday Label */}
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {DAYS_OF_WEEK[index]}
              </div>

              {/* Date Cell */}
              <button
                onClick={() => onDateSelect(date)}
                className={`
                  w-full aspect-square p-3 rounded-lg relative
                  transition-all duration-200
                  cursor-pointer hover:shadow-md
                  ${dayData ? getPhaseColor(dayData.phase, dayData.isPredicted) : 'bg-background'}
                  ${isCurrentDay ? 'ring-2 ring-offset-1 ring-primary' : ''}
                  ${isSelectedDay ? 'ring-2 ring-primary' : ''}
                `}
                aria-label={`${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              >
                <div className="text-center text-base font-semibold text-foreground">
                  {date.getDate()}
                </div>

                {/* Indicators */}
                {dayData && (
                  <div className="flex justify-center gap-0.5 mt-2">
                    {dayData.hasFlowLogged && (
                      <div
                        className="w-1 h-1 rounded-full bg-foreground"
                        title="Flow logged"
                      />
                    )}
                    {dayData.hasSymptoms && (
                      <div
                        className="w-1 h-1 rounded-full bg-foreground"
                        title="Symptoms logged"
                      />
                    )}
                    {dayData.hasNote && (
                      <div
                        className="w-1 h-1 rounded-full bg-foreground"
                        title="Note added"
                      />
                    )}
                  </div>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
