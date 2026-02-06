import React from 'react'
import { formatTime } from '@/lib/journal-utils'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
  isLoading?: boolean
}

export function ChatBubble({ role, content, timestamp, isLoading }: ChatBubbleProps) {
  const isUser = role === 'user'

  return (
    <div
      className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}
      role="article"
      aria-label={isUser ? 'Your message' : 'Journal response'}
    >
      <div
        className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted text-foreground rounded-bl-none'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
            {timestamp && (
              <p
                className={`text-xs mt-2 ${
                  isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}
              >
                {formatTime(timestamp)}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="mb-4 flex justify-start">
      <div className="bg-muted text-foreground rounded-lg rounded-bl-none px-4 py-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
