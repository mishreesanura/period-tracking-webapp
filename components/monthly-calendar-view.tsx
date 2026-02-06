'use client'

import React from 'react'
import { getPhaseColor } from '@/lib/cycle-utils'

interface CycleDayData {
  date: Date
  phase: any
  isPredicted: boolean
  hasFlowLogged: boolean
  hasSymptoms: boolean
  hasNote: boolean
}

interface MonthlyCalendarViewProps {
  currentMonth: Date
  calendarData: Map<string, CycleDayData>
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  today: Date
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function MonthlyCalendarView({
  currentMonth,
  calendarData,
  selectedDate,
  onDateSelect,
  today,
}: MonthlyCalendarViewProps) {
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  
  // Get the first Monday of the calendar (may be from previous month)
  const firstMonday = new Date(firstDayOfMonth)
  const dayOfWeek = firstMonday.getDay()
  const daysToGoBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  firstMonday.setDate(firstMonday.getDate() - daysToGoBack)

  const weeks: Date[][] = []
  const currentDate = new Date(firstMonday)

  // Generate 6 weeks of dates
  for (let week = 0; week < 6; week++) {
    const weekDates: Date[] = []
    for (let day = 0; day < 7; day++) {
      weekDates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    weeks.push(weekDates)
    if (currentDate.getMonth() !== currentMonth.getMonth() && week > 3) break
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

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth()
  }

  return (
    <div className="w-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weeks.map((week, weekIndex) =>
          week.map((date, dayIndex) => {
            const dateStr = date.toISOString().split('T')[0]
            const dayData = calendarData.get(dateStr)
            const inCurrentMonth = isCurrentMonth(date)
            const isCurrentDay = isToday(date)
            const isSelectedDay = isSelected(date)

            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => onDateSelect(date)}
                disabled={!inCurrentMonth}
                className={`
                  aspect-square p-2 rounded-lg relative
                  transition-all duration-200
                  ${!inCurrentMonth ? 'opacity-30 cursor-default' : 'cursor-pointer hover:shadow-md'}
                  ${dayData ? getPhaseColor(dayData.phase, dayData.isPredicted) : 'bg-background'}
                  ${isCurrentDay ? 'ring-2 ring-offset-1 ring-primary' : ''}
                  ${isSelectedDay ? 'ring-2 ring-primary' : ''}
                `}
                aria-label={`${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              >
                {/* Date Number */}
                <div className="text-center text-sm font-semibold text-foreground">
                  {date.getDate()}
                </div>

                {/* Indicators */}
                {dayData && (
                  <div className="flex justify-center gap-0.5 mt-1">
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
            )
          })
        )}
      </div>
    </div>
  )
}
