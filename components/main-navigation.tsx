'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, BookOpen, Home, Heart, Activity, Droplet, Sparkles, Music, Settings, GraduationCap, Utensils, User, BarChart3 } from 'lucide-react'
import { NotificationBell } from '@/components/notification-bell'

export function MainNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Insights', href: '/insights', icon: BarChart3 },
    { label: 'Journal', href: '/journal', icon: BookOpen },
    { label: 'Movement', href: '/movement', icon: Activity },
    { label: 'Hydration', href: '/hydration', icon: Droplet },
    { label: 'Care', href: '/care', icon: Heart },
    { label: 'Skincare', href: '/skincare', icon: Sparkles },
    { label: 'Sounds', href: '/sounds', icon: Music },
    { label: 'Learn', href: '/learn', icon: GraduationCap },
    { label: 'Food & Mood', href: '/nutrition', icon: Utensils },
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-foreground">
              ऋतु
            </Link>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
            <div className="ml-1 border-l border-border pl-2">
              <NotificationBell />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
