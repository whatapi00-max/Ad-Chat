// Central configuration for all editable Customer Support site content.
// Update the values below without touching any UI/component code.

export const SITE_CONFIG = {
  tagline: 'Online',

  english: {
    whatsapp: 'https://example.com/whatsapp-en',
    telegram: 'https://example.com/telegram-en',
    signal: 'https://example.com/signal-en',
  },

  hindi: {
    whatsapp: 'https://example.com/whatsapp-hi',
    telegram: 'https://example.com/telegram-hi',
    signal: 'https://example.com/signal-hi',
  },
}

/** Returns true when a configured link/value has not been set yet. */
export function isConfigured(value: string | undefined | null): boolean {
  return Boolean(value) && value !== 'CHANGE_ME'
}
