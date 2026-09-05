import { useState } from 'react'
import { ChatHeader } from './components/ChatHeader'
import { ChatWindow } from './components/ChatWindow'
import { ChatInput } from './components/ChatInput'
import { useChat } from './hooks/useChat'
import type { Language, Platform } from './types/chat'

function composerPlaceholder(step: string): string {
  switch (step) {
    case 'initial':
      return 'Type a message...'
    case 'languageSelection':
      return 'Please choose a language...'
    case 'waitingForName':
      return 'Type a name...'
    case 'platformSelection':
      return 'Please choose an option above'
    case 'completed':
      return 'Conversation completed'
    default:
      return 'Type a message...'
  }
}

function App() {
  const {
    messages,
    step,
    language,
    isTyping,
    inputValue,
    setInputValue,
    selectInitialSuggestion,
    submitName,
    selectLanguage,
    selectPlatform,
    resetConversation,
  } = useChat()

  const [unavailableNotice, setUnavailableNotice] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const composerDisabled = isTyping || (step !== 'waitingForName' && step !== 'initial')

  const handleSend = () => {
    if (step === 'initial') selectInitialSuggestion()
    else if (step === 'waitingForName') submitName(inputValue)
  }

  const openPlatformLink = (href: string) => {
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    const isMobile = isAndroid || isIOS

    if (isMobile && href.includes('wa.me')) {
      // WhatsApp
      const phoneMatch = href.match(/wa\.me\/(\d+)/)
      if (phoneMatch) {
        const phone = phoneMatch[1]
        const text = href.match(/text=([^&]*)/)?.[1] || ''

        if (isAndroid) {
          const intentUrl = `intent://send?phone=${phone}${text ? `&text=${text}` : ''}#Intent;scheme=whatsapp;package=com.whatsapp;end`
          window.location.href = intentUrl
          return
        }

        if (isIOS) {
          const whatsappAppUrl = `whatsapp://send?phone=${phone}${text ? `&text=${text}` : ''}`
          window.location.href = whatsappAppUrl
          return
        }
      }
    }

    if (isMobile && href.includes('signal.me')) {
      // Signal - replace https with sgnl to open app directly
      const sgnlUrl = href.replace(/^https:/, 'sgnl:')
      window.location.href = sgnlUrl
      return
    }

    // Desktop or non-WhatsApp/Signal link
    window.location.href = href
  }

  const handleSelectOption = (id: string) => {
    if (step === 'languageSelection') {
      selectLanguage(id as Language)
    } else if (step === 'platformSelection') {
      selectPlatform(id as Platform, (href) => {
        setTimeout(() => {
          openPlatformLink(href)
        }, 2500)
      })
    }
  }

  const handleCtaClick = (href: string | null) => {
    if (!href) {
      setUnavailableNotice(true)
      setTimeout(() => setUnavailableNotice(false), 3000)
      return
    }
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex min-h-dvh w-full items-center justify-center overflow-x-hidden bg-gray-100 sm:min-h-screen sm:p-6">
      <div className="relative flex h-dvh w-full max-w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-[850px] sm:max-w-[440px] sm:rounded-3xl">
        <ChatHeader onMenuClick={() => setMenuOpen((v) => !v)} isTyping={isTyping} />

        {menuOpen && (
          <div className="absolute right-3 top-14 z-20 w-48 overflow-hidden rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/10">
            <button
              type="button"
              onClick={() => {
                resetConversation()
                setMenuOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Start new conversation
            </button>
          </div>
        )}

        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSelectOption={handleSelectOption}
          onCtaClick={handleCtaClick}
        />

        {unavailableNotice && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-gray-900/90 px-4 py-2 text-sm text-white shadow-lg">
            {language === 'hindi'
              ? 'माफ़ करें, यह विकल्प अभी उपलब्ध नहीं है।'
              : 'Sorry, this option is currently unavailable.'}
          </div>
        )}

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          disabled={composerDisabled}
          placeholder={composerPlaceholder(step)}
        />
      </div>
    </div>
  )
}

export default App
