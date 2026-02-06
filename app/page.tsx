import Link from 'next/link'
import { Calendar, BookOpen, Heart, Activity, Droplet, Sparkles, Music, GraduationCap, Utensils, User, ArrowRight, BarChart3 } from 'lucide-react'
import { HomeCareSuggestions } from '@/components/home-care-suggestions'

export default function HomePage() {
  const features = [
    {
      title: 'Period Tracker',
      description: 'Track your cycle with colour-coded days. Monitor period, ovulation, fertile, and safe days.',
      href: '/calendar',
      icon: Calendar,
      color: 'from-pink-500 to-red-500',
      badge: 'Primary',
    },
    {
      title: 'Health Insights',
      description: 'Pattern awareness, AI insights, and gentle risk signals. Understand your body over time.',
      href: '/insights',
      icon: BarChart3,
      color: 'from-violet-500 to-purple-500',
      badge: 'New',
    },
    {
      title: 'Emotional Journal',
      description: 'A safe, private space to reflect on your feelings. Gentle AI journaling that validates, not judges.',
      href: '/journal',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      badge: 'New',
    },
    {
      title: 'Movement Guide',
      description: 'Cycle-aware exercise suggestions. Move with your body, not against it.',
      href: '/movement',
      icon: Activity,
      color: 'from-green-500 to-teal-500',
      badge: 'New',
    },
    {
      title: 'Hydration',
      description: 'Gentle hydration support with cycle-aware reminders. No pressure, just care.',
      href: '/hydration',
      icon: Droplet,
      color: 'from-blue-500 to-cyan-500',
      badge: 'New',
    },
    {
      title: 'Care Suggestions',
      description: 'Personalized, gentle ideas based on your cycle phase and emotional state.',
      href: '/care',
      icon: Heart,
      color: 'from-rose-500 to-red-500',
      badge: 'New',
    },
    {
      title: 'Skincare',
      description: 'Cycle-aware skincare support. Gentle routines that work with your body, not against it.',
      href: '/skincare',
      icon: Sparkles,
      color: 'from-pink-400 to-rose-400',
      badge: 'New',
    },
    {
      title: 'Sounds',
      description: 'Calming music and sound suggestions to support emotional regulation across your cycle.',
      href: '/sounds',
      icon: Music,
      color: 'from-indigo-400 to-sky-400',
      badge: 'New',
    },
    {
      title: 'Learn',
      description: 'Friendly, shame-free menstrual health education. Fun facts, myth-busting, and short reads.',
      href: '/learn',
      icon: GraduationCap,
      color: 'from-amber-400 to-orange-400',
      badge: 'New',
    },
    {
      title: 'Food & Mood',
      description: 'Cycle-aware food suggestions. Nourishment as care, not discipline. Cravings explained, never judged.',
      href: '/nutrition',
      icon: Utensils,
      color: 'from-orange-300 to-amber-400',
      badge: 'New',
    },
    {
      title: 'Your Profile',
      description: 'Help us understand you better. Optional health context for smarter, more personal insights.',
      href: '/profile',
      icon: User,
      color: 'from-slate-400 to-zinc-500',
      badge: 'New',
    },
  ]

  return (
    <main className="min-h-screen bg-background pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Welcome to My Cycle
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A calm, non-judgmental space to track your cycle and emotional wellbeing. Everything you share stays private.
          </p>
        </div>

        {/* Care Suggestions Section */}
        <HomeCareSuggestions />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/50"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${feature.color}`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 inline-block p-3 rounded-lg bg-muted">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>

                  {/* Title and Description */}
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-pretty">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="rounded-lg border border-border bg-muted/30 p-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            How This Works
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span>Track your cycle with intuitive colour-coded calendars</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span>Journal your feelings in a safe, private space</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span>All your data stays on your device—nothing is shared</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
