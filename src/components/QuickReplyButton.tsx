import type { ReactNode } from 'react'

interface QuickReplyButtonProps {
  label: string
  onSelect: () => void
  disabled?: boolean
  selected?: boolean
  icon?: ReactNode
}

/** Large tap-friendly quick-reply / suggestion button used throughout the chat. */
export function QuickReplyButton({
  label,
  onSelect,
  disabled = false,
  selected = false,
  icon,
}: QuickReplyButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex w-full items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-[15px] font-medium transition-all duration-150 active:scale-[0.98] ${
        selected
          ? 'border-brand bg-brand/10 text-brand-dark'
          : disabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
            : 'border-brand/30 bg-white text-brand-dark shadow-sm hover:bg-brand/5'
      }`}
    >
      {icon && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
      {label}
    </button>
  )
}
