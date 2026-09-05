// Central configuration for all editable Customer Support site content.
// Update the values below without touching any UI/component code.

export const SITE_CONFIG = {
  tagline: 'Online',

  english: {
    whatsapp: 'https://wa.me/917028781429?text=Hello%2C%20I%20want%20New%20ID',
    telegram: 'CHANGE_ME',
    signal: 'https://signal.me/#eu/4oXK3J01Pw4-HkI5cFjMWr7CeT5VyxuuXBFiDwGskl3AWrITF91CnK45DoRSM4Zu',
  },

  hindi: {
    whatsapp: 'https://wa.me/917028781429?text=Hello%2C%20I%20want%20New%20ID',
    telegram: 'CHANGE_ME',
    signal: 'https://signal.me/#eu/4oXK3J01Pw4-HkI5cFjMWr7CeT5VyxuuXBFiDwGskl3AWrITF91CnK45DoRSM4Zu',
  },
}

/** Returns true when a configured link/value has not been set yet. */
export function isConfigured(value: string | undefined | null): boolean {
  return Boolean(value) && value !== 'CHANGE_ME'
}
