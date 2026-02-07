"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { calculateCyclePhase } from "@/lib/cycle-utils";

interface CyclePhaseOverviewProps {
  cycleStartDate: Date;
  cycleLengthDays: number;
  periodDurationDays: number;
}

interface PhaseCardProps {
  label: string;
  subLabel: string;
  progress: number; // 0 to 100 representing the fill level
  colorClass: string; // Tailwind text color class for the ring dots
  fillClass: string; // Tailwind background color for the liquid fill
  isActive: boolean;
  dayNumber?: number; // Optional indicator bubble
}

function LiquidPhaseCard({ label, subLabel, progress, colorClass, fillClass, isActive, dayNumber }: PhaseCardProps) {
  // Wave animation variants. Uses a CSS mask or background-position trick ideally, 
  // but for Framer Motion, we can animate an element moving.
  const waveVariants = {
    animate: {
      x: ["-50%", "0%"],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-60 grayscale-[0.5] hover:opacity-90 hover:grayscale-0 scale-95'}`}>
      
      {/* Outer Dashed Ring Container */}
      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full border-2 border-dashed p-1 ${colorClass.replace('text-', 'border-')}`}>
        
           {/* Active Progress Marker Bubble on the border (simulated) */}
           {isActive && dayNumber !== undefined && (
             <div className="absolute -top-1 -right-1 bg-white border border-slate-100 shadow-sm rounded-full w-6 h-6 flex items-center justify-center text-[10px] font-bold text-slate-600 z-20 animate-in zoom-in duration-300 delay-150">
                {dayNumber}
             </div>
           )}

        {/* Inner Liquid Circle */}
        <div className="relative w-full h-full rounded-full bg-white shadow-inner border border-slate-50 overflow-hidden z-10 isolate">
           
           {/* Liquid Fill */}
           <motion.div 
             className={`absolute bottom-0 left-[-50%] w-[200%] h-full opacity-90 ${fillClass}`}
             style={{ bottom: `${Math.min(100, Math.max(0, progress)) - 100}%` }} 
             animate={{ bottom: `${Math.min(100, Math.max(0, progress)) - 100}%` }}
             transition={{ duration: 1.5, ease: "easeOut" }}
           >
              {/* Wave Shape via SVG Background */}
              <motion.div 
                className="w-full h-8 absolute -top-8" 
                variants={waveVariants}
                animate="animate"
                style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '50% 100%'
                }}
              />
           </motion.div>

           {/* Text Content Overlay */}
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pt-1 pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-slate-500/80 mb-0.5 tracking-wider">{label}</span>
              <span className={`text-xs sm:text-sm font-black ${progress > 50 ? 'text-white drop-shadow-md' : 'text-slate-800'}`}>
                {subLabel}
              </span>
           </div>
        </div>
      </div>
    </div>
  );
}

export function CyclePhaseOverview({
  cycleStartDate,
  cycleLengthDays,
  periodDurationDays,
}: CyclePhaseOverviewProps) {
  
  // Calculate today's status
  const currentStatus = useMemo(() => {
    const now = new Date();
    // Normalize to midnight for accurate day diffs
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(cycleStartDate);
    start.setHours(0,0,0,0);

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysDiff = Math.floor((today.getTime() - start.getTime()) / msPerDay);
    
    // Day in Current Cycle (1-based for display)
    const dayInCycleIndex = daysDiff % cycleLengthDays; 
    const currentDay = dayInCycleIndex + 1;
    
    // Determine Phase
    const phaseData = calculateCyclePhase(now, cycleStartDate, cycleLengthDays, periodDurationDays);

    return { currentDay, phase: phaseData.phase };
  }, [cycleStartDate, cycleLengthDays, periodDurationDays]);

  // --- Card 1: Ovulation (Target: Day 14 typically) ---
  const ovulationDay = Math.floor(cycleLengthDays / 2); // Roughly midpoint usually
  const isOvulationActive = currentStatus.phase === "ovulation" || currentStatus.phase === "follicular";
  
  // Progress logic: If before ovulation, fill up towards it. If past, stay full or empty?
  // Image implies "Day 14" is the target. Let's fill based on proximity.
  // Actually, visual fill usually indicates "time passed in this phase".
  const ovulationProgress = Math.min(100, (currentStatus.currentDay / ovulationDay) * 100); 

  // --- Card 2: Period (Target: Days 1-5) ---
  const isPeriodActive = currentStatus.phase === "period" || currentStatus.phase === "spotting";
  const periodProgress = isPeriodActive 
    ? (currentStatus.currentDay / periodDurationDays) * 100 
    : (currentStatus.currentDay > periodDurationDays ? 100 : 0);
  
  const periodLabel = isPeriodActive ? `${currentStatus.currentDay} day` : `5 days`;

  // --- Card 3: PMS / Next Cycle (Target: Last 7 days) ---
  const pmsStartDay = cycleLengthDays - 7;
  const isPMSActive = currentStatus.currentDay >= pmsStartDay;
  
  // Progress approaches 100 as we get closer to next period
  const pmsProgress = isPMSActive 
     ? ((currentStatus.currentDay - pmsStartDay) / 7) * 100 
     : 0;

  return (
    <div className="w-full flex flex-row items-center justify-start lg:justify-end gap-2 lg:gap-6 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide snap-x px-1">
      
        <div className="snap-start shrink-0">
        <LiquidPhaseCard 
            label="Ovulation"
            subLabel={`Day ${ovulationDay}`} 
            progress={isOvulationActive ? ovulationProgress : (currentStatus.currentDay > ovulationDay ? 100 : 0)}
            colorClass="text-purple-300"
            fillClass="bg-violet-300" 
            isActive={currentStatus.phase === "ovulation"}
            dayNumber={14}
        />
        </div>

        <div className="snap-start shrink-0">
        <LiquidPhaseCard 
            label="Period"
            subLabel={isPeriodActive ? `${currentStatus.currentDay} day` : `${periodDurationDays} day`}
            progress={isPeriodActive ? (currentStatus.currentDay / periodDurationDays)*100 : (currentStatus.currentDay < periodDurationDays ? 0 : 100)} 
            colorClass="text-rose-300"
            fillClass="bg-rose-300"
            isActive={isPeriodActive}
            dayNumber={isPeriodActive ? currentStatus.currentDay : 3}
        />
        </div>

        <div className="snap-start shrink-0">
        <LiquidPhaseCard 
            label="PMS"
            subLabel={isPMSActive ? `${currentStatus.currentDay - pmsStartDay + 1} day` : `7 day`} 
            progress={isPMSActive ? pmsProgress : (currentStatus.currentDay < pmsStartDay ? 0 : 100)}
            colorClass="text-amber-300"
            fillClass="bg-amber-300"
            isActive={isPMSActive}
            dayNumber={isPMSActive ? currentStatus.currentDay - pmsStartDay + 1 : 1}
        />
        </div>

    </div>
  );
}
