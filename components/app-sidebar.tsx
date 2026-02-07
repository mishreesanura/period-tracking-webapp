'use client'

import * as React from "react"
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Calendar, BookOpen, Home, Heart, Activity, Droplet, Sparkles, Music, Settings, GraduationCap, Utensils, User, BarChart3, Bell } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NotificationBell } from '@/components/notification-bell'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
      pink: 'bg-[#FFF0F5] text-[#DB2777] hover:bg-[#FFF0F5] hover:text-[#DB2777]',
      violet: 'bg-[#F5F3FF] text-[#7C3AED] hover:bg-[#F5F3FF] hover:text-[#7C3AED]',
      blue: 'bg-[#EFF6FF] text-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB]',
      neutral: 'bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white'
    }

    // Colors when INACTIVE
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
    <Sidebar collapsible="icon" className="border-r border-border bg-white" {...props}>
      <SidebarHeader className="h-16 border-b border-border/50 flex flex-row items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
           {/* Logo Image */}
           <div className="relative h-10 w-32">
              <Image 
                src="/logo.jpeg" 
                alt="Ritu Logo" 
                fill
                className="object-contain object-left"
                priority
              />
           </div>
        </Link>
        <div className="group-data-[collapsible=icon]:hidden">
            <NotificationBell />
        </div>
        {/* Helper for collapsed state showing just the logo initial or similar? */}
        <div className="hidden group-data-[collapsible=icon]:flex w-full items-center justify-center p-2">
           <div className="relative h-8 w-8 rounded-md overflow-hidden">
             <Image 
               src="/logo.jpeg" 
               alt="Ritu" 
               fill
               className="object-cover"
             />
           </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                const styles = getThemeStyles(item.theme, active)

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                      className={`h-10 transition-colors duration-200 font-medium ${styles}`}
                    >
                      <Link href={item.href}>
                        <Icon className={`h-4 w-4 ${active ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
