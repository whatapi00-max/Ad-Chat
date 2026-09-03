import { Check, ExternalLink } from 'lucide-react'
import type { Message } from '../types/chat'
import { PlatformOptions } from './PlatformOptions'

interface MessageBubbleProps {
  message: Message
  onSelectOption?: (id: string) => void
  onCtaClick?: (href: string | null) => void
}

export function MessageBubble({ message, onSelectOption, onCtaClick }: MessageBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <div
      className={`flex w-full animate-msg-in ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 shadow-sm ${
          isUser
            ? 'rounded-tr-sm bg-brand text-white'
            : 'rounded-tl-sm bg-white text-gray-800 ring-1 ring-black/5'
        }`}
      >
        {message.text && (
          <p className="whitespace-pre-line break-words text-[15px] leading-snug">
            {message.text}
          </p>
        )}

        {message.kind === 'cta' && message.cta && (
          <button
            type="button"
            onClick={() => onCtaClick?.(message.cta!.href)}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            {message.cta.label}
            <ExternalLink size={16} aria-hidden="true" />
          </button>
        )}

        {message.kind === 'quick-replies' && message.options && (
          <PlatformOptions
            options={message.options}
            answered={Boolean(message.answered)}
            onSelect={(id) => onSelectOption?.(id)}
          />
        )}

        <div
          className={`mt-1 flex items-center gap-1 text-[11px] ${
            isUser ? 'justify-end text-white/70' : 'justify-end text-gray-400'
          }`}
        >
          <span>{message.timestamp}</span>
          {isUser && <Check size={13} aria-label="Sent" />}
        </div>
      </div>
    </div>
  )
}
