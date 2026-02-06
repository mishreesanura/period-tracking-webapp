import { CycleCalendar } from '@/components/cycle-calendar'

export const metadata = {
  title: 'Period Calendar - Track Your Cycle',
  description: 'Track your menstrual cycle with colour-coded calendar views. Monitor period, ovulation, and cycle phases.',
}

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-background">
      <CycleCalendar />
    </main>
  )
}
