"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateKey } from "@/lib/utils";

interface CycleDayData {
  date: Date;
  phase: any;
  isPredicted: boolean;
  hasFlowLogged: boolean;
  hasSymptoms: boolean;
  hasNote: boolean;
}

interface WeeklyCalendarViewProps {
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
      return `${baseStyle} bg-purple-100 text-purple-800 hover:bg-purple-200`;
    case "follicular":
      return `${baseStyle} bg-emerald-100 text-emerald-800 hover:bg-emerald-200`;
    default:
      return `${baseStyle} bg-white text-slate-700 hover:bg-slate-50`;
  }
};

export function WeeklyCalendarView({
  currentMonth,
  calendarData,
  selectedDate,
  onDateSelect,
  today,
}: WeeklyCalendarViewProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  // Get the Monday of the current week
  const getWeekStart = (baseDate: Date, offset: number) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + offset * 7);
    const dayOfWeek = date.getDay();
    const daysToGoBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    date.setDate(date.getDate() - daysToGoBack);
    return date;
  };

  const weekStart = getWeekStart(today, weekOffset);
  const weekDates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    weekDates.push(date);
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

  return (
    <div className="w-full">
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-8 px-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-rose-50 hover:text-rose-600 rounded-full w-10 h-10 transition-colors"
          onClick={() => setWeekOffset(weekOffset - 1)}
          aria-label="Previous week"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm font-medium text-slate-500 min-w-48 text-center uppercase tracking-wide">
          {weekStart.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}{" "}
          −{" "}
          {new Date(
            weekStart.getTime() + 6 * 24 * 60 * 60 * 1000,
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-rose-50 hover:text-rose-600 rounded-full w-10 h-10 transition-colors"
          onClick={() => setWeekOffset(weekOffset + 1)}
          aria-label="Next week"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 lg:gap-3">
        {weekDates.map((date, index) => {
          const dateStr = formatDateKey(date);
          const dayData = calendarData.get(dateStr);
          const isCurrentDay = isToday(date);
          const isSelectedDay = isSelected(date);

          const phaseStyle = dayData
            ? getPhaseStyle(dayData.phase, dayData.isPredicted)
            : "bg-transparent text-slate-300";

          return (
            <div key={index} className="flex flex-col gap-2">
              <div className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {DAYS_OF_WEEK[index]}
              </div>
              <button
                onClick={() => onDateSelect(date)}
                className={`
                  aspect-[4/5] w-full flex flex-col items-center justify-start py-3 rounded-2xl relative
                  transition-all duration-200 outline-none
                  cursor-pointer
                  ${phaseStyle}
                  ${isCurrentDay ? "ring-2 ring-rose-400 ring-offset-2" : ""}
                  ${isSelectedDay ? "ring-4 ring-rose-200 z-10 scale-105 shadow-md" : ""}
                `}
              >
                <span className="text-lg font-medium mb-1">
                  {date.getDate()}
                </span>

                {/* Indicators */}
                {dayData && (
                  <div className="flex justify-center gap-1 mt-auto pb-1">
                    {dayData.hasFlowLogged && (
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-600/70" />
                    )}
                    {dayData.hasSymptoms && (
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                    )}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
