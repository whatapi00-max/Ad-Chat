// Central configuration for all editable Customer Support site content.
// Update the values below without touching any UI/component code.

export const SITE_CONFIG = {
  tagline: 'Online',

  english: {
    whatsapp: 'https://wa.me/917028781429',
    telegram: 'CHANGE_ME',
    signal: 'CHANGE_ME',
  },

  hindi: {
    whatsapp: 'https://wa.me/917028781429',
    telegram: 'CHANGE_ME',
    signal: 'CHANGE_ME',
  },
}

/** Returns true when a configured link/value has not been set yet. */
export function isConfigured(value: string | undefined | null): boolean {
  return Boolean(value) && value !== 'CHANGE_ME'
}
