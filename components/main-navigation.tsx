'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, BookOpen, Home, Heart, Activity, Droplet, Sparkles, Music, Settings, GraduationCap, Utensils, User, BarChart3 } from 'lucide-react'
import { NotificationBell } from '@/components/notification-bell'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export function MainNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { label: 'Home', href: '/', icon: Home, theme: 'neutral' },
    { label: 'Calendar', href: '/calendar', icon: Calendar, theme: 'pink' },
    { label: 'Insights', href: '/insights', icon: BarChart3, theme: 'violet' },
    { label: 'Journal', href: '/journal', icon: BookOpen, theme: 'blue' },
    { label: 'Movement', href: '/movement', icon: Activity, theme: 'blue' },
    { label: 'Hydration', href: '/hydration', icon: Droplet, theme: 'blue' },
    { label: 'Care', href: '/care', icon: Heart, theme: 'pink' },
    { label: 'Skincare', href: '/skincare', icon: Sparkles, theme: 'pink' },
    { label: 'Sounds', href: '/sounds', icon: Music, theme: 'violet' },
    { label: 'Learn', href: '/learn', icon: GraduationCap, theme: 'blue' },
    { label: 'Food & Mood', href: '/nutrition', icon: Utensils, theme: 'pink' },
    { label: 'Profile', href: '/profile', icon: User, theme: 'violet' },
    { label: 'Settings', href: '/settings', icon: Settings, theme: 'neutral' },
  ]

  const getThemeStyles = (theme: string, active: boolean) => {
    // Colors when ACTIVE
    const activeColors = {
      pink: 'bg-[#FFF0F5] text-[#DB2777]',
      violet: 'bg-[#F5F3FF] text-[#7C3AED]',
      blue: 'bg-[#EFF6FF] text-[#2563EB]',
      neutral: 'bg-neutral-900 text-white'
    }

    // Colors when INACTIVE (Text is always colored now)
    const inactiveColors = {
      pink: 'text-[#DB2777] hover:bg-[#FFF0F5]',
      violet: 'text-[#7C3AED] hover:bg-[#F5F3FF]',
      blue: 'text-[#2563EB] hover:bg-[#EFF6FF]',
      neutral: 'text-neutral-600 hover:bg-neutral-100'
    }

    const themeKey = theme as keyof typeof activeColors || 'neutral'
    return active ? activeColors[themeKey] : inactiveColors[themeKey]
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex-shrink-0 flex items-center min-w-[50px]">
            <Link href="/" className="text-2xl font-bold text-neutral-900 tracking-tight">
              ऋतु
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center gap-1 xl:gap-2 min-w-0">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              const styles = getThemeStyles(item.theme, active)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-bold rounded-full transition-all duration-200 ${styles}`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              )
            })}
          </div>
          
          <div className="flex-shrink-0 flex items-center justify-end min-w-[40px]">
            <NotificationBell />
            
              {/* Show the sign-in and sign-up buttons when the user is signed out */}
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* Show the user button when the user is signed in */}
              <SignedIn>
                <UserButton />
              </SignedIn>
            
          </div>
        </div>
      </div>
    </nav>
  )
}
