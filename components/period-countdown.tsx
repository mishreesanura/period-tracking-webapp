'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet } from 'lucide-react'

interface PeriodCountdownProps {
  cycleStartDate: Date
  cycleLengthDays: number
}

export function PeriodCountdown({ cycleStartDate, cycleLengthDays }: PeriodCountdownProps) {
  const [daysRemaining, setDaysRemaining] = useState<number>(0)
  const [nextPeriodDate, setNextPeriodDate] = useState<Date | null>(null)

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Normalize start date
    const start = new Date(cycleStartDate)
    start.setHours(0, 0, 0, 0)
    
    const dayDiff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    
    // Calculate cycles passed since start
    const cyclesPassed = Math.floor(dayDiff / cycleLengthDays)
    
    // Current cycle start
    const currentCycleStart = new Date(start)
    currentCycleStart.setDate(start.getDate() + (cyclesPassed * cycleLengthDays))
    
    // Next cycle start
    const expectedNextStart = new Date(currentCycleStart)
    expectedNextStart.setDate(currentCycleStart.getDate() + cycleLengthDays)
    
    const msUntil = expectedNextStart.getTime() - today.getTime()
    const daysUntil = Math.ceil(msUntil / (1000 * 60 * 60 * 24))
    
    setDaysRemaining(daysUntil)
    setNextPeriodDate(expectedNextStart)
  }, [cycleStartDate, cycleLengthDays])

  if (!nextPeriodDate) return null

  return (
    <div className="flex flex-row items-center gap-4 px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Progress Ring Background */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#f1f5f9"
            strokeWidth="3"
            fill="none"
          />
          {/* Active Ring */}
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="#fb7185" // rose-400
            strokeWidth="3"
            fill="none"
            strokeDasharray={126} // 2 * PI * 20
            strokeDashoffset={126 - (126 * ((cycleLengthDays - daysRemaining) / cycleLengthDays))}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 126 }}
            animate={{ strokeDashoffset: 126 - (126 * ((cycleLengthDays - daysRemaining) / cycleLengthDays)) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
             <motion.div 
               initial={{ scale: 0.5, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.2, type: "spring" }}
               className="text-sm font-bold text-slate-800"
             >
                {daysRemaining}
             </motion.div>
        </div>
      </div>

      <div className="text-left">
        <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
            Next Period
        </h3>
        <p className="text-[10px] text-slate-500 font-medium">
            {nextPeriodDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>
    </div>
  )
}

