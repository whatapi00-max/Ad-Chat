import { useEffect, useRef } from 'react'
import type { Message } from '../types/chat'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

interface ChatWindowProps {
  messages: Message[]
  isTyping: boolean
  onSelectOption: (id: string) => void
  onCtaClick: (href: string | null) => void
}

export function ChatWindow({
  messages,
  isTyping,
  onSelectOption,
  onCtaClick,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  return (
    <div
      className="chat-pattern flex-1 overflow-y-auto px-3 py-4"
      role="log"
      aria-live="polite"
      aria-label="Conversation with Customer Support"
    >
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onSelectOption={onSelectOption}
            onCtaClick={onCtaClick}
          />
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
