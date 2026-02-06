'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import type { AppNotification } from '@/lib/notification-types'
import { getCategoryColor } from '@/lib/notification-utils'
import { CATEGORY_LABELS } from '@/lib/notification-types'

interface NotificationToastProps {
  notification: AppNotification
  onDismiss: () => void
  onRead: (id: string) => void
}

export function NotificationToast({ notification, onDismiss, onRead }: NotificationToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setVisible(true), 50)
    // Auto dismiss after 8s
    const hideTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 300)
    }, 8000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [onDismiss])

  const handleDismiss = () => {
    setVisible(false)
    setTimeout(onDismiss, 300)
  }

  const handleClick = () => {
    onRead(notification.id)
    setVisible(false)
    setTimeout(onDismiss, 300)
  }

  return (
    <div
      className={`fixed top-20 right-4 z-[60] max-w-sm w-full transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="rounded-lg border border-border bg-card shadow-lg overflow-hidden">
        <div className="flex items-start gap-3 p-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getCategoryColor(notification.category)}`}>
                {CATEGORY_LABELS[notification.category]}
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {notification.body}
            </p>
            <Link
              href={notification.href}
              onClick={handleClick}
              className="inline-block mt-2 text-xs font-medium text-primary hover:underline"
            >
              {notification.hrefLabel}
            </Link>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
