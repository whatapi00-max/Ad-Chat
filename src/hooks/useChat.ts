import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE_CONFIG, isConfigured } from '../config/siteConfig'
import type {
  ConversationStep,
  Language,
  Message,
  Platform,
} from '../types/chat'

const INITIAL_SUGGESTION = 'Hello, I want New ID'

/** Bot copy that depends on the language the user picked. */
const TRANSLATIONS: Record<
  Language,
  {
    namePrompt: string
    nameConfirmation: (name: string) => string
    unavailable: string
    redirecting: (platform: Platform) => string
  }
> = {
  english: {
    namePrompt: 'Please share the ID name you want.',
    nameConfirmation: (name) =>
      `Great choice, ${name}! 🎉\n\nPlease choose the platform you have:`,
    unavailable: 'Sorry, this option is currently unavailable.',
    redirecting: (platform) => `Thanks, Redirecting to ${platform}...`,
  },
  hindi: {
    namePrompt: 'aap kis naam se ID chahte hain?',
    nameConfirmation: (name) =>
      `bahut badhiya, ${name}! 🎉\n\nkripya wah platform chunein jo aapke paas hai:`,
    unavailable: 'maaf karein, yeh vikalp abhi uplabdh nahi hai.',
    redirecting: (platform) => `dhanyavaad, ${platform} par redirect kiya ja raha hai...`,
  },
}

function nowStamp(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function initialMessages(): Message[] {
  return [
    {
      id: makeId(),
      sender: 'bot',
      kind: 'text',
      text: 'Hello 👋 Welcome to our site',
      timestamp: nowStamp(),
    },
  ]
}

const TYPING_MIN_DELAY = 2000
const TYPING_MAX_DELAY = 4000

function randomDelay(): number {
  return TYPING_MIN_DELAY + Math.random() * (TYPING_MAX_DELAY - TYPING_MIN_DELAY)
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [step, setStep] = useState<ConversationStep>('initial')
  const [userName, setUserName] = useState<string | undefined>(undefined)
  const [language, setLanguage] = useState<Language | undefined>(undefined)
  const [showInitialSuggestion, setShowInitialSuggestion] = useState<boolean>(true)
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState<string>(INITIAL_SUGGESTION)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const addMessage = useCallback((msg: Omit<Message, 'id' | 'timestamp'>) => {
    setMessages((prev) => [...prev, { ...msg, id: makeId(), timestamp: nowStamp() }])
  }, [])

  /** Shows a typing indicator, then invokes `build` to add the bot's reply. */
  const simulateBotReply = useCallback(
    (build: () => void, delay: number = randomDelay()) => {
      setIsTyping(true)
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false)
        build()
      }, delay)
    },
    [],
  )

  const markLastOptionsAnswered = useCallback(() => {
    setMessages((prev) => {
      const next = [...prev]
      for (let i = next.length - 1; i >= 0; i -= 1) {
        if (next[i].kind === 'quick-replies' && !next[i].answered) {
          next[i] = { ...next[i], answered: true }
          break
        }
      }
      return next
    })
  }, [])

  const selectInitialSuggestion = useCallback(() => {
    if (!showInitialSuggestion || step !== 'initial') return
    const text = inputValue.trim() || INITIAL_SUGGESTION
    setShowInitialSuggestion(false)
    addMessage({ sender: 'user', kind: 'text', text })
    setInputValue('')
    setStep('languageSelection')
    simulateBotReply(() => {
      addMessage({
        sender: 'bot',
        kind: 'quick-replies',
        text: 'Please choose your preferred language:',
        options: [
          { id: 'english', label: 'English 🇬🇧' },
          { id: 'hindi', label: 'Hindi 🇮🇳' },
        ],
      })
    })
  }, [addMessage, inputValue, showInitialSuggestion, simulateBotReply, step])

  const submitName = useCallback(
    (rawName: string) => {
      const name = rawName.trim()
      if (!name || step !== 'waitingForName') return
      setUserName(name)
      addMessage({ sender: 'user', kind: 'text', text: name })
      setInputValue('')
      setStep('platformSelection')
      const copy = TRANSLATIONS[language ?? 'english']
      simulateBotReply(() => {
        addMessage({
          sender: 'bot',
          kind: 'quick-replies',
          text: copy.nameConfirmation(name),
          options: [
            { id: 'WhatsApp', label: 'WhatsApp' },
            { id: 'Telegram', label: 'Telegram' },
            { id: 'Signal', label: 'Signal' },
          ],
        })
      })
    },
    [addMessage, language, simulateBotReply, step],
  )

  const selectLanguage = useCallback(
    (lang: Language) => {
      if (step !== 'languageSelection') return
      markLastOptionsAnswered()
      setLanguage(lang)
      addMessage({
        sender: 'user',
        kind: 'text',
        text: lang === 'english' ? 'English 🇬🇧' : 'Hindi 🇮🇳',
      })

      setStep('waitingForName')
      simulateBotReply(() => {
        addMessage({
          sender: 'bot',
          kind: 'text',
          text: TRANSLATIONS[lang].namePrompt,
        })
      })
    },
    [addMessage, markLastOptionsAnswered, simulateBotReply, step],
  )

  const selectPlatform = useCallback(
    (platform: Platform, onRedirect?: (href: string) => void) => {
      if (step !== 'platformSelection') return
      markLastOptionsAnswered()
      addMessage({ sender: 'user', kind: 'text', text: platform })
      setStep('completed')

      const langConfig = SITE_CONFIG[language ?? 'english']
      const hrefMap: Record<Platform, string> = {
        WhatsApp: langConfig.whatsapp,
        Telegram: langConfig.telegram,
        Signal: langConfig.signal,
      }
      const href = hrefMap[platform]
      const available = isConfigured(href)
      const copy = TRANSLATIONS[language ?? 'english']

      simulateBotReply(() => {
        addMessage({
          sender: 'bot',
          kind: 'text',
          text: available ? copy.redirecting(platform) : copy.unavailable,
        })
        if (available) {
          onRedirect?.(href)
        }
      })
    },
    [addMessage, language, markLastOptionsAnswered, simulateBotReply, step],
  )

  const resetConversation = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsTyping(false)
    setInputValue(INITIAL_SUGGESTION)
    setMessages(initialMessages())
    setStep('initial')
    setUserName(undefined)
    setLanguage(undefined)
    setShowInitialSuggestion(true)
  }, [])

  return {
    messages,
    step,
    userName,
    language,
    isTyping,
    inputValue,
    setInputValue,
    showInitialSuggestion,
    selectInitialSuggestion,
    submitName,
    selectLanguage,
    selectPlatform,
    resetConversation,
  }
}
