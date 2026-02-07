"use client";

import React from "react";
import { getPhaseColor } from "@/lib/cycle-utils";
import { formatDateKey } from "@/lib/utils";

interface CycleDayData {
  date: Date;
  phase: any;
  isPredicted: boolean;
  hasFlowLogged: boolean;
  hasSymptoms: boolean;
  hasNote: boolean;
}

interface MonthlyCalendarViewProps {
  currentMonth: Date;
  calendarData: Map<string, CycleDayData>;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  today: Date;
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getPhaseStyle = (phase: string, isPredicted: boolean) => {
  const baseStyle = "transition-all duration-300 border-transparent";

  if (isPredicted) {
    switch (phase) {
      case "period":
      case "menstrual":
        return `${baseStyle} bg-rose-50 text-rose-400 border-2 border-dashed border-rose-200`;
      case "ovulation":
        return `${baseStyle} bg-amber-50 text-amber-400 border-2 border-dashed border-amber-200`;
      case "luteal":
        return `${baseStyle} bg-purple-50 text-purple-400 border-2 border-dashed border-purple-200`; // PMS?
      case "follicular":
        return `${baseStyle} bg-emerald-50 text-emerald-400 border-2 border-dashed border-emerald-100`; // Safe?
      default:
        return `${baseStyle} bg-slate-50 text-slate-400 border-2 border-dashed border-slate-200`;
    }
  }

  // Actual logged/confirmed phases
  switch (phase) {
    case "period":
    case "menstrual":
      return `${baseStyle} bg-rose-200 text-rose-800 shadow-sm hover:bg-rose-300`;
    case "ovulation":
      return `${baseStyle} bg-amber-200 text-amber-800 shadow-sm hover:bg-amber-300`;
    case "luteal":
      return `${baseStyle} bg-purple-100 text-purple-800 hover:bg-purple-200`; // PMS
    case "follicular":
      return `${baseStyle} bg-emerald-100 text-emerald-800 hover:bg-emerald-200`; // Safe
    default:
      return `${baseStyle} bg-white text-slate-700 hover:bg-slate-50`;
  }
};

export function MonthlyCalendarView({
  currentMonth,
  calendarData,
  selectedDate,
  onDateSelect,
  today,
}: MonthlyCalendarViewProps) {
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  );

  // Get the first Monday of the calendar (may be from previous month)
  const firstMonday = new Date(firstDayOfMonth);
  const dayOfWeek = firstMonday.getDay();
  const daysToGoBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  firstMonday.setDate(firstMonday.getDate() - daysToGoBack);

  const weeks: Date[][] = [];
  const currentDate = new Date(firstMonday);

  // Generate 6 weeks of dates
  for (let week = 0; week < 6; week++) {
    const weekDates: Date[] = [];
    for (let day = 0; day < 7; day++) {
      weekDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(weekDates);
    if (currentDate.getMonth() !== currentMonth.getMonth() && week > 3) break;
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  return (
    <div className="w-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-4">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 lg:gap-3">
        {weeks.map((week, weekIndex) =>
          week.map((date, dayIndex) => {
            const dateStr = formatDateKey(date);
            const dayData = calendarData.get(dateStr);
            const inCurrentMonth = isCurrentMonth(date);
            const isCurrentDay = isToday(date);
            const isSelectedDay = isSelected(date);

            // Determine styles
            const phaseStyle = dayData
              ? getPhaseStyle(dayData.phase, dayData.isPredicted)
              : "bg-transparent text-slate-300";

            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => onDateSelect(date)}
                disabled={!inCurrentMonth}
                className={`
                  aspect-[4/5] md:aspect-square flex flex-col items-center justify-start py-2 rounded-2xl relative
                  transition-all duration-200 outline-none
                  ${!inCurrentMonth ? "opacity-20 cursor-default" : "cursor-pointer"}
                  ${phaseStyle}
                  ${isCurrentDay ? "ring-2 ring-rose-400 ring-offset-2" : ""}
                  ${isSelectedDay ? "ring-4 ring-rose-200 z-10 scale-105 shadow-md" : ""}
                `}
                aria-label={`${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
              >
                {/* Date Number */}
                <div
                  className={`
                  text-sm md:text-base font-medium mb-1
                  ${!dayData && !inCurrentMonth ? "text-slate-300" : ""}
                `}
                >
                  {date.getDate()}
                </div>

                {/* Indicators - Refined dots */}
                {dayData && inCurrentMonth && (
                  <div className="flex justify-center gap-1 mt-auto pb-1 md:pb-2">
                    {dayData.hasFlowLogged && (
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-rose-600/70"
                        title="Flow logged"
                      />
                    )}
                    {dayData.hasSymptoms && (
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-purple-500/60"
                        title="Symptoms logged"
                      />
                    )}
                    {dayData.hasNote && (
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-slate-400/60"
                        title="Note added"
                      />
                    )}
                  </div>
                )}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
