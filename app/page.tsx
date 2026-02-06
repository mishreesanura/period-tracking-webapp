import Link from 'next/link'
import { Calendar, BookOpen, Heart, Activity, Droplet, Sparkles, Music, GraduationCap, Utensils, User, ArrowRight, BarChart3 } from 'lucide-react'
import { HomeCareSuggestions } from '@/components/home-care-suggestions'

export default function HomePage() {
  const features = [
    // Row 1 (Core Daily Anchor)
    {
      title: 'Period Tracker',
      description: 'Track your cycle with colour-coded days.',
      href: '/calendar',
      icon: Calendar,
      theme: 'pink',
      badge: 'Primary',
      className: 'md:col-span-7 md:row-span-2 shadow-md', // Strong visual weight
    },
    // Row 1 (Emotional Journal)
    {
      title: 'Emotional Journal',
      description: 'A safe, private space to reflect.',
      href: '/journal',
      icon: BookOpen,
      theme: 'blue',
      badge: 'New',
      className: 'md:col-span-5 md:row-span-1',
    },
    // Row 2 (Health Insights)
    {
      title: 'Health Insights',
      description: 'Gentle risk signals and pattern awareness.',
      href: '/insights',
      icon: BarChart3,
      theme: 'violet',
      badge: 'New',
      className: 'md:col-span-5 md:row-span-1',
    },
    // Row 3 (Actionable Support - 3 cols)
    {
      title: 'Care Suggestions',
      description: 'Ideas to help you feel better today.',
      href: '/care',
      icon: Heart,
      theme: 'pink',
      badge: 'Daily',
      className: 'md:col-span-4 md:row-span-1',
    },
    {
      title: 'Food & Mood',
      description: 'Nourishment tied to your cycle.',
      href: '/nutrition',
      icon: Utensils,
      theme: 'pink',
      badge: 'Wellness',
      className: 'md:col-span-4 md:row-span-1',
    },
    {
      title: 'Movement Guide',
      description: 'Move with your body, not against it.',
      href: '/movement',
      icon: Activity,
      theme: 'blue',
      badge: 'Active',
      className: 'md:col-span-4 md:row-span-1',
    },
    // Row 4 (Light Lifestyle Support - 4 cols)
    {
      title: 'Hydration',
      description: 'Gentle reminders.',
      href: '/hydration',
      icon: Droplet,
      theme: 'blue',
      badge: 'Daily',
      className: 'col-span-12 md:col-span-3 md:row-span-1',
    },
    {
      title: 'Skincare',
      description: 'Cycle-aware routine.',
      href: '/skincare',
      icon: Sparkles,
      theme: 'pink',
      badge: 'Beauty',
      className: 'col-span-12 md:col-span-3 md:row-span-1',
    },
    {
      title: 'Sounds',
      description: 'Calm regulation.',
      href: '/sounds',
      icon: Music,
      theme: 'violet',
      badge: 'Relax',
      className: 'col-span-12 md:col-span-3 md:row-span-1',
    },
    {
      title: 'Learn',
      description: 'Shame-free education.',
      href: '/learn',
      icon: GraduationCap,
      theme: 'blue',
      badge: 'Facts',
      className: 'col-span-12 md:col-span-3 md:row-span-1',
    },
    // Row 5 (Low Frequency)
    {
      title: 'Your Profile',
      description: 'Optional health context for smarter insights.',
      href: '/profile',
      icon: User,
      theme: 'violet',
      badge: 'Settings',
      className: 'md:col-span-12 md:row-span-1 opacity-90 hover:opacity-100', // Low priority visual
    },
  ]

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'pink':
        return {
          cardBg: 'bg-[#FFF0F5]', // Lavender Blush
          border: 'border-[#FBCFE8]', // pink-200
          hoverBorder: 'hover:border-[#F472B6]', // pink-400
          iconBg: 'bg-white',
          iconColor: 'text-[#DB2777]', // pink-600
          badgeBg: 'bg-white/80',
          badgeText: 'text-[#9D174D]', // pink-800
          title: 'text-[#831843]', // pink-900
          text: 'text-[#9D174D]/80', // pink-800
          cta: 'text-[#DB2777]', // pink-600
        }
      case 'violet':
        return {
          cardBg: 'bg-[#F5F3FF]', // violet-50
          border: 'border-[#DDD6FE]', // violet-200
          hoverBorder: 'hover:border-[#A78BFA]', // violet-400
          iconBg: 'bg-white',
          iconColor: 'text-[#7C3AED]', // violet-600
          badgeBg: 'bg-white/80',
          badgeText: 'text-[#5B21B6]', // violet-800
          title: 'text-[#4C1D95]', // violet-900
          text: 'text-[#5B21B6]/80', // violet-800
          cta: 'text-[#7C3AED]', // violet-600
        }
      case 'blue':
        return {
          cardBg: 'bg-[#EFF6FF]', // blue-50
          border: 'border-[#BFDBFE]', // blue-200
          hoverBorder: 'hover:border-[#60A5FA]', // blue-400
          iconBg: 'bg-white',
          iconColor: 'text-[#2563EB]', // blue-600
          badgeBg: 'bg-white/80',
          badgeText: 'text-[#1E40AF]', // blue-800
          title: 'text-[#1E3A8A]', // blue-900
          text: 'text-[#1E40AF]/80', // blue-800
          cta: 'text-[#2563EB]', // blue-600
        }
      default:
        return {
          cardBg: 'bg-neutral-50',
          border: 'border-neutral-200',
          hoverBorder: 'hover:border-neutral-400',
          iconBg: 'bg-white',
          iconColor: 'text-neutral-900',
          badgeBg: 'bg-neutral-100',
          badgeText: 'text-neutral-700',
          title: 'text-neutral-900',
          text: 'text-neutral-600',
          cta: 'text-neutral-900',
        }
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFDFD] pt-12 pb-12 px-4 sm:px-6 lg:px-8 font-instrument">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-[32px] font-bold text-neutral-900 mb-4 text-balance tracking-tight">
            Welcome to ऋतु
          </h1>
          <p className="text-[18px] font-medium text-neutral-500 max-w-2xl mx-auto text-pretty">
            A calm, non-judgmental space to track your cycle and emotional wellbeing. Everything you share stays private.
          </p>
        </div>

        {/* Care Suggestions Section */}
        <HomeCareSuggestions />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon
            const styles = getThemeStyles(feature.theme)

            return (
              <Link
                key={feature.href}
                href={feature.href}
                className={`group relative overflow-hidden rounded-[24px] border ${styles.cardBg} ${styles.border} p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${styles.hoverBorder} ${feature.className || 'col-span-12 md:col-span-4'}`}
              >
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-block p-3 rounded-2xl shadow-sm ${styles.iconBg}`}>
                          <Icon className={`h-6 w-6 ${styles.iconColor}`} />
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${styles.badgeBg} ${styles.badgeText}`}>
                        {feature.badge}
                      </span>
                    </div>

                    <h2 className={`text-[20px] font-bold mb-2 ${styles.title}`}>
                      {feature.title}
                    </h2>
                    <p className={`text-[15px] leading-relaxed font-medium ${styles.text}`}>
                      {feature.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 text-[14px] font-bold ${styles.cta} group-hover:gap-3 transition-all pt-4`}>
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8">
          <h3 className="text-[20px] font-semibold text-neutral-black mb-4">
            How This Works
          </h3>
          <ul className="space-y-3 text-[14px] text-neutral-black/70">
            <li className="flex gap-3">
              <span className="text-brand-pink font-bold">→</span>
              <span>Track your cycle with intuitive colour-coded calendars</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-pink font-bold">→</span>
              <span>Journal your feelings in a safe, private space</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-pink font-bold">→</span>
              <span>All your data stays on your device—nothing is shared</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
