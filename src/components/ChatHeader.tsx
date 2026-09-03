import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react'
import { SITE_CONFIG } from '../config/siteConfig'
import { BillyAvatar } from './BillyAvatar'

const HEADER_NAME = 'Customer Support'

interface ChatHeaderProps {
  onMenuClick?: () => void
  isTyping?: boolean
}

export function ChatHeader({ onMenuClick, isTyping = false }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 bg-brand-dark px-3 py-3 text-white shadow-sm">
      <button
        type="button"
        aria-label="Go back"
        className="rounded-full p-1.5 transition-colors hover:bg-white/10 active:bg-white/20"
      >
        <ArrowLeft size={20} aria-hidden="true" />
      </button>

      <BillyAvatar size={38} />

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[16px] font-semibold leading-tight">
          {HEADER_NAME}
        </h1>
        <p className="text-[12px] leading-tight text-white/75">
          {isTyping ? 'typing...' : SITE_CONFIG.tagline}
        </p>
      </div>

      <button
        type="button"
        aria-label="Voice call"
        className="rounded-full p-1.5 transition-colors hover:bg-white/10 active:bg-white/20"
      >
        <Phone size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Video call"
        className="rounded-full p-1.5 transition-colors hover:bg-white/10 active:bg-white/20"
      >
        <Video size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="rounded-full p-1.5 transition-colors hover:bg-white/10 active:bg-white/20"
      >
        <MoreVertical size={20} aria-hidden="true" />
      </button>
    </header>
  )
}
