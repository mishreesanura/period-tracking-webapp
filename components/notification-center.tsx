'use client'

import Link from 'next/link'
import { X, Check, Trash2 } from 'lucide-react'
import type { AppNotification } from '@/lib/notification-types'
import { CATEGORY_LABELS } from '@/lib/notification-types'
import { getCategoryColor } from '@/lib/notification-utils'

interface NotificationCenterProps {
  notifications: AppNotification[]
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
  onClear: () => void
  onClose: () => void
  onOpenSettings: () => void
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClear,
  onClose,
  onOpenSettings,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="absolute top-full mt-2 w-[360px] max-h-[480px] rounded-lg border border-border bg-card shadow-xl overflow-hidden z-[70] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-foreground/10 text-muted-foreground">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Mark all as read"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClear}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Clear all"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No notifications yet.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Gentle nudges will appear here when the time feels right.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`relative px-4 py-3 transition-colors hover:bg-muted/30 ${
                  !notif.read ? 'bg-muted/20' : ''
                }`}
              >
                {!notif.read && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground/40" />
                )}
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${getCategoryColor(notif.category)}`}>
                        {CATEGORY_LABELS[notif.category]}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatTimeAgo(notif.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {notif.body}
                    </p>
                    <Link
                      href={notif.href}
                      onClick={() => {
                        onMarkRead(notif.id)
                        onClose()
                      }}
                      className="inline-block mt-1 text-xs font-medium text-primary hover:underline"
                    >
                      {notif.hrefLabel}
                    </Link>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={() => onMarkRead(notif.id)}
                      className="flex-shrink-0 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                      title="Mark as read"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-4 py-2.5 bg-muted/20">
        <button
          onClick={() => {
            onOpenSettings()
            onClose()
          }}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Notification settings
        </button>
      </div>
    </div>
  )
}
