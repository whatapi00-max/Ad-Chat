import { Send } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus()
    }
  }, [disabled])

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (value.trim() && !disabled) onSend()
    }
  }

  return (
    <div
      className="flex items-end gap-2 border-t border-gray-200 bg-white px-3 py-2"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        aria-label="Message input"
        rows={1}
        className="max-h-24 flex-1 resize-none rounded-full border border-gray-300 bg-gray-50 px-4 py-2.5 text-[15px] leading-snug text-gray-800 outline-none placeholder:text-gray-400 focus:border-brand focus:ring-1 focus:ring-brand disabled:bg-gray-100 disabled:text-gray-400"
      />
      <button
        type="button"
        onClick={() => value.trim() && !disabled && onSend()}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-all active:scale-95 ${
          disabled || !value.trim()
            ? 'cursor-not-allowed bg-gray-200 text-gray-400'
            : 'bg-brand text-white hover:bg-brand-dark'
        }`}
      >
        <Send size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
