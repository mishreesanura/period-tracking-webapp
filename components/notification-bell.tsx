'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Bell } from 'lucide-react'
import { calculateCyclePhase } from '@/lib/cycle-utils'
import type { AppNotification, NotificationPreferences } from '@/lib/notification-types'
import {
  loadNotifications,
  saveNotifications,
  loadPreferences,
  getUnreadCount,
  getTodayNotificationCount,
  getCurrentTimeOfDay,
  inferMoodState,
  mapToNotificationPhase,
  generateNotification,
  isInQuietHours,
  isPausedForToday,
  getEffectiveMaxPerDay,
  incrementDismissedCount,
  resetDismissedCount,
} from '@/lib/notification-utils'
import { NotificationCenter } from '@/components/notification-center'
import { NotificationToast } from '@/components/notification-toast'

export function NotificationBell() {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [showCenter, setShowCenter] = useState(false)
  const [toastNotification, setToastNotification] = useState<AppNotification | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)

  // Load notifications on mount
  useEffect(() => {
    setNotifications(loadNotifications())
  }, [])

  // Close notification center on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setShowCenter(false)
      }
    }
    if (showCenter) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCenter])

  // Notification generation engine (runs on interval)
  useEffect(() => {
    function tryGenerate() {
      const prefs = loadPreferences()

      // Respect controls
      if (prefs.toneMode === 'silent') return
      if (isPausedForToday(prefs)) return
      if (isInQuietHours(prefs)) return

      const current = loadNotifications()
      const todayCount = getTodayNotificationCount(current)
      const effectiveMax = getEffectiveMaxPerDay(prefs)
      if (todayCount >= effectiveMax) return

      // Build context
      let phase = 'follicular'
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('cycleStartDate')
        if (saved) {
          const cycleStart = new Date(saved)
          const cycleData = calculateCyclePhase(new Date(), cycleStart)
          phase = cycleData.phase
        }
      }

      let journalMood: string | undefined
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('lastJournalMood')
        if (saved) journalMood = saved
      }

      const notif = generateNotification({
        cyclePhase: mapToNotificationPhase(phase),
        moodState: inferMoodState(journalMood),
        timeOfDay: getCurrentTimeOfDay(),
        toneMode: prefs.toneMode,
      })

      if (notif) {
        const updated = [notif, ...current].slice(0, 50) // Keep max 50
        saveNotifications(updated)
        setNotifications(updated)
        setToastNotification(notif)
      }
    }

    // Generate first notification after a short delay (simulating real timing)
    const initialTimer = setTimeout(tryGenerate, 5000)
    // Then check every 5 minutes
    const interval = setInterval(tryGenerate, 5 * 60 * 1000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  const handleMarkRead = useCallback((id: string) => {
    resetDismissedCount()
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      saveNotifications(updated)
      return updated
    })
  }, [])

  const handleMarkAllRead = useCallback(() => {
    resetDismissedCount()
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }))
      saveNotifications(updated)
      return updated
    })
  }, [])

  const handleClear = useCallback(() => {
    setNotifications([])
    saveNotifications([])
  }, [])

  const handleToastDismiss = useCallback(() => {
    incrementDismissedCount()
    setToastNotification(null)
  }, [])

  const unreadCount = getUnreadCount(notifications)

  return (
    <div ref={bellRef} className="relative">
      <button
        onClick={() => setShowCenter(!showCenter)}
        className="relative flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-foreground/80 px-1 text-[9px] font-bold text-background">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Center dropdown */}
      {showCenter && (
        <NotificationCenter
          notifications={notifications}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
          onClear={handleClear}
          onClose={() => setShowCenter(false)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {/* Toast */}
      {toastNotification && (
        <NotificationToast
          notification={toastNotification}
          onDismiss={handleToastDismiss}
          onRead={handleMarkRead}
        />
      )}
    </div>
  )
}
