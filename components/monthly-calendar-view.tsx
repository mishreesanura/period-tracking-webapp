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
  const baseStyle = "transition-all duration-300 border border-transparent rounded-xl shadow-sm"; 

  if (isPredicted) {
    switch (phase) {
      case "period":
      case "menstrual":
        return `bg-rose-50 text-rose-500 border-rose-200 border-dashed shadow-none`;
      case "ovulation":
        return `bg-amber-50 text-amber-500 border-amber-200 border-dashed shadow-none`;
      case "luteal":
        return `bg-purple-50 text-purple-500 border-purple-200 border-dashed shadow-none`; 
      case "follicular":
        return `bg-emerald-50 text-emerald-500 border-emerald-100 border-dashed shadow-none`; 
      default:
        return `bg-slate-50 text-slate-400 border-slate-100 border-dashed shadow-none`;
    }
  }

  // Actual logged/confirmed phases
  switch (phase) {
    case "period":
    case "menstrual":
      return `bg-rose-100 text-rose-700 hover:bg-rose-200 hover:text-rose-800 hover:shadow-md ring-1 ring-rose-200`; 
    case "ovulation":
      return `bg-amber-100 text-amber-700 hover:bg-amber-200 hover:text-amber-800 hover:shadow-md ring-1 ring-amber-200`;
    case "luteal":
      return `bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 ring-1 ring-purple-100`; 
    case "follicular":
      return `bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 ring-1 ring-emerald-100`; 
    default:
      return `bg-white text-slate-700 hover:bg-slate-50 border-slate-100`;
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

  const firstMonday = new Date(firstDayOfMonth);
  const dayOfWeek = firstMonday.getDay();
  const daysToGoBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  firstMonday.setDate(firstMonday.getDate() - daysToGoBack);

  const weeks: Date[][] = [];
  const currentDate = new Date(firstMonday);

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
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 gap-x-1 lg:gap-x-2">
        {weeks.map((week, weekIndex) =>
          week.map((date, dayIndex) => {
            const dateStr = formatDateKey(date);
            const dayData = calendarData.get(dateStr);
            const isDayInCurrentMonth = isCurrentMonth(date);
            const isCurrentDay = isToday(date);
            const isSelectedDay = isSelected(date);

            const phaseStyle = dayData
              ? getPhaseStyle(dayData.phase, dayData.isPredicted)
              : "bg-transparent text-slate-300";
            
            const monthStyle = isDayInCurrentMonth ? "opacity-100" : "opacity-30 contrast-50 grayscale";

            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`
                  relative h-10 lg:h-16 w-full flex flex-col items-center justify-start py-1 px-1
                  ${phaseStyle}
                  ${monthStyle}
                  ${isSelectedDay ? "ring-2 ring-slate-900 ring-offset-2 z-10 scale-105" : ""}
                `}
              >
                <div className="flex items-center justify-center w-full relative">
                    <span 
                        className={`text-xs lg:text-sm font-medium z-10 ${
                            isCurrentDay 
                            ? "bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md"
                            : ""
                        }`}
                    >
                        {date.getDate()}
                    </span>
                    
                    {dayData?.hasFlowLogged && (
                      <div className="absolute top-0 right-0 lg:right-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      </div>
                    )}
                </div>

                <div className="mt-auto hidden lg:flex gap-0.5 justify-center">
                   {dayData?.hasNote && <div className="w-1 h-1 rounded-full bg-indigo-300" />}
                   {dayData?.hasSymptoms && <div className="w-1 h-1 rounded-full bg-amber-300" />}
                </div>

              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
