export type Sender = 'bot' | 'user'

export type MessageKind = 'text' | 'quick-replies' | 'cta'

export interface QuickReply {
  id: string
  label: string
}

export interface Message {
  id: string
  sender: Sender
  kind: MessageKind
  text?: string
  timestamp: string
  /** Quick reply options attached to a bot message (rendered inline, once). */
  options?: QuickReply[]
  /** Whether the quick replies attached to this message have been answered. */
  answered?: boolean
  /** For CTA messages: label + href for the action button. */
  cta?: {
    label: string
    href: string | null
  }
}

export type ConversationStep =
  | 'initial'
  | 'waitingForName'
  | 'languageSelection'
  | 'platformSelection'
  | 'completed'

export type Language = 'english' | 'hindi'

export type Platform = 'WhatsApp' | 'Telegram' | 'Signal'

export interface ChatPersistedState {
  messages: Message[]
  step: ConversationStep
  userName?: string
  language?: Language
  showInitialSuggestion: boolean
}
