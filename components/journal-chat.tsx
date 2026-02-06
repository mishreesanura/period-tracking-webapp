'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, ArrowLeft } from 'lucide-react'
import { ChatBubble, TypingIndicator } from './journal-chat-bubble'
import { MoodTag } from './mood-tag'
import { JournalInitialPrompts } from './journal-initial-prompts'
import { detectMood, generateAIResponse } from '@/lib/journal-utils'
import type { MoodCategory, MoodIntensity, JournalEntry } from '@/lib/journal-types'

interface JournalChatProps {
  onBack?: () => void
  isFirstTime?: boolean
}

export function JournalChat({ onBack, isFirstTime = true }: JournalChatProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasStarted, setHasStarted] = useState(!isFirstTime)
  const [currentMood, setCurrentMood] = useState<{ category: MoodCategory; intensity: MoodIntensity } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt)
    setHasStarted(true)
    inputRef.current?.focus()
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Detect mood from user message
    const { category, intensity } = detectMood(inputValue)
    setCurrentMood({ category, intensity })

    // Simulate AI thinking
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Generate AI response
    const aiResponse = generateAIResponse(inputValue, category)

    const assistantMessage = {
      role: 'assistant' as const,
      content: aiResponse,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)

    // Auto-focus input
    inputRef.current?.focus()
  }

  const handleUpdateMood = (category: MoodCategory, intensity: MoodIntensity) => {
    setCurrentMood({ category, intensity })
  }

  const handleRemoveMood = () => {
    setCurrentMood(null)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <div className="flex-1" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Emotional Journal</h2>
        <p className="text-sm text-muted-foreground">
          This space is just for you. What you share stays private.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Initial message */}
        {!hasStarted && (
          <div className="pt-8">
            <div className="mb-8 text-center">
              <p className="text-lg text-foreground font-medium mb-2">Hi. This space is just for you.</p>
              <p className="text-muted-foreground">You can vent, reflect, or type anything you feel.</p>
            </div>

            <JournalInitialPrompts onPromptSelect={handlePromptSelect} />
          </div>
        )}

        {/* Chat messages */}
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Mood Tag and Input */}
      <div className="border-t border-border bg-card p-4 sm:p-6 space-y-4">
        {/* Mood tag */}
        {currentMood && (
          <div className="flex justify-center">
            <MoodTag
              category={currentMood.category}
              intensity={currentMood.intensity}
              onUpdate={handleUpdateMood}
              onRemove={handleRemoveMood}
              editable={true}
            />
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What's on your mind? There's no wrong way to feel..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSendMessage(e as any)
                }
              }}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Press Ctrl+Enter to send</p>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
