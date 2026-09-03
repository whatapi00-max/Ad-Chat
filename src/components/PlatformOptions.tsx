import type { ReactNode } from 'react'
import { SiWhatsapp, SiTelegram, SiSignal } from 'react-icons/si'
import type { QuickReply } from '../types/chat'
import { QuickReplyButton } from './QuickReplyButton'

/** Original brand icons for the platform quick replies (WhatsApp/Telegram/Signal). */
const PLATFORM_ICONS: Record<string, ReactNode> = {
  WhatsApp: <SiWhatsapp size={20} color="#25D366" />,
  Telegram: <SiTelegram size={20} color="#26A5E4" />,
  Signal: <SiSignal size={20} color="#3A76F0" />,
}

interface PlatformOptionsProps {
  options: QuickReply[]
  answered: boolean
  onSelect: (id: string) => void
}

/** Renders a group of quick-reply option buttons attached to a bot message
 * (used for language selection, platform selection, etc). Once answered the
 * buttons become inactive so the visitor can't trigger the step twice. */
export function PlatformOptions({ options, answered, onSelect }: PlatformOptionsProps) {
  return (
    <div className="mt-3 flex flex-col gap-2" role="group" aria-label="Quick reply options">
      {options.map((option) => (
        <QuickReplyButton
          key={option.id}
          label={option.label}
          disabled={answered}
          onSelect={() => onSelect(option.id)}
          icon={PLATFORM_ICONS[option.id]}
        />
      ))}
    </div>
  )
}
