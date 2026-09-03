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

  const handleSelectOption = (id: string) => {
    if (step === 'languageSelection') {
      selectLanguage(id as Language)
    } else if (step === 'platformSelection') {
      selectPlatform(id as Platform, (href) => {
        setTimeout(() => {
          window.open(href, '_blank', 'noopener,noreferrer')
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
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 sm:p-6">
      <div className="relative flex h-screen w-full max-w-[440px] flex-col overflow-hidden bg-white shadow-2xl sm:h-[850px] sm:rounded-3xl">
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
