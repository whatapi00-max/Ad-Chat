// Central configuration for all editable Customer Support site content.
// Update the values below without touching any UI/component code.

export const SITE_CONFIG = {
  tagline: 'Online',

  english: {
    whatsapp: 'https://wa.me/917028781429?text=Hello%2C%20I%20want%20New%20ID',
    telegram: 'https://t.me/cuscare2026',
    signal: 'https://signal.me/#eu/EfJANMbrMg_2fwc9iYzEE0-SynPDKn1FB13L1YQJPMtzPqHL_a5JELNK6OCTep2X',
  },

  hindi: {
    whatsapp: 'https://wa.me/917028781429?text=Hello%2C%20I%20want%20New%20ID',
    telegram: 'https://t.me/cuscare2026',
    signal: 'https://signal.me/#eu/EfJANMbrMg_2fwc9iYzEE0-SynPDKn1FB13L1YQJPMtzPqHL_a5JELNK6OCTep2X',
  },
}

/** Returns true when a configured link/value has not been set yet. */
export function isConfigured(value: string | undefined | null): boolean {
  return Boolean(value) && value !== 'CHANGE_ME'
}
