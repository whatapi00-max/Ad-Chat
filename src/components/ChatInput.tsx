import { Camera, Mic, Paperclip, Send, Smile } from 'lucide-react'
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

  const showMic = !value.trim() || disabled

  return (
    <div
      className="flex items-end gap-2 border-t border-gray-200 bg-[#f0f0f0] px-2 py-2"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <button
        type="button"
        aria-label="Emoji"
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200"
      >
        <Smile size={22} aria-hidden="true" />
      </button>

      <div className="flex flex-1 items-end gap-1 rounded-[22px] bg-white px-2 py-1.5 shadow-sm">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? placeholder : 'Message'}
          aria-label="Message input"
          rows={1}
          className="max-h-24 min-h-[34px] flex-1 resize-none rounded-[22px] bg-white px-2 py-2 text-[15px] leading-snug text-gray-800 outline-none placeholder:text-gray-400 disabled:text-gray-400"
        />

        <button
          type="button"
          aria-label="Attach file"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
        >
          <Paperclip size={20} aria-hidden="true" />
        </button>

        {showMic ? (
          <button
            type="button"
            aria-label="Camera"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          >
            <Camera size={20} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => value.trim() && !disabled && onSend()}
        disabled={disabled || !value.trim()}
        aria-label={showMic ? 'Record voice' : 'Send message'}
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-all active:scale-95 ${
          showMic
            ? 'bg-brand text-white hover:bg-brand-dark'
            : 'bg-brand text-white hover:bg-brand-dark'
        }`}
      >
        {showMic ? <Mic size={20} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
      </button>
    </div>
  )
}
