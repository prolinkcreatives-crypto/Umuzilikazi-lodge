/**
 * MOSELEKATSE GUESTHOUSE — DESIGN TOKENS
 * Source of truth, derived from the "Zambian Serenity" design system.
 * Brand thesis: Affordable luxury rooted in Lusaka — Modern-Organic
 * structure with Refined Glassmorphism, the shield as a quiet recurring motif.
 *
 * Do not hardcode hex values in components — import from here.
 */

export const colors = {
  // Core surfaces
  surface: '#fbf9f8',
  surfaceDim: '#dbdad9',
  surfaceBright: '#fbf9f8',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f5f3f3',
  surfaceContainer: '#efeded',
  surfaceContainerHigh: '#e9e8e7',
  surfaceContainerHighest: '#e3e2e2',
  onSurface: '#1b1c1c',
  onSurfaceVariant: '#414944',
  inverseSurface: '#303030',
  inverseOnSurface: '#f2f0f0',
  outline: '#717974',
  outlineVariant: '#c0c9c2',

  // Brand
  primary: '#001f14', // Forest Green (deep)
  onPrimary: '#ffffff',
  primaryContainer: '#013626',
  onPrimaryContainer: '#71a08b',
  inversePrimary: '#a0d1ba',

  secondary: '#755b00', // Warm Gold (deep, for text use)
  onSecondary: '#ffffff',
  secondaryContainer: '#fed979',
  onSecondaryContainer: '#785d03',

  tertiary: '#1a1a1a', // Charcoal
  onTertiary: '#ffffff',
  tertiaryContainer: '#2e2e2f',
  onTertiaryContainer: '#979596',

  error: '#ba1a1a',
  onError: '#ffffff',

  // Fixed tones (for accents on dark or light regardless of theme)
  primaryFixed: '#bbedd5',
  primaryFixedDim: '#a0d1ba',
  secondaryFixed: '#ffdf90',
  secondaryFixedDim: '#e6c366',

  background: '#fbf9f8',
  onBackground: '#1b1c1c',
  surfaceVariant: '#e3e2e2',

  // Named brand tones referenced directly in copy/design discussions
  forestGreen: '#013626',
  forestGreenDeep: '#001f14',
  warmGold: '#755b00',
  warmGoldBright: '#e6c366',
  softBeige: '#f0eded',
  ivoryWhite: '#fcf9f8',

  // Extended for the luxury lodge direction: bronze + wood, used sparingly
  bronze: '#8a6a3f',
  wood: '#5c4530',
  stone: '#cfc9c0',

  glassFill: 'rgba(252, 249, 248, 0.8)',
  glassFillDark: 'rgba(1, 31, 20, 0.55)',
} as const;

export const typography = {
  displayLg: { font: 'Playfair Display', size: '64px', weight: 700, lineHeight: 1.1, tracking: '-0.02em' },
  headlineLg: { font: 'Playfair Display', size: '40px', weight: 600, lineHeight: 1.2 },
  headlineLgMobile: { font: 'Playfair Display', size: '32px', weight: 600, lineHeight: 1.2 },
  headlineMd: { font: 'Playfair Display', size: '28px', weight: 500, lineHeight: 1.3 },
  bodyLg: { font: 'Inter', size: '18px', weight: 400, lineHeight: 1.6 },
  bodyMd: { font: 'Inter', size: '16px', weight: 400, lineHeight: 1.6 },
  labelMd: { font: 'Inter', size: '14px', weight: 600, lineHeight: 1.0, tracking: '0.05em' },
  labelSm: { font: 'Inter', size: '12px', weight: 500, lineHeight: 1.0 },
} as const;

export const radii = {
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
} as const;

export const spacing = {
  base: '8px',
  gutter: '24px',
  marginMobile: '16px',
  sectionVSpace: '80px',
  maxWidth: '1200px',
} as const;

/** Lodge facts — single source of truth for content that appears in multiple places. */
export const lodgeInfo = {
  name: 'Umuzilikazi Lodge',
  legalSignName: 'Umuzilikazi Guest House',
  tagline: 'Where Zambian Heritage Meets Timeless Luxury',
  address: 'Umuzilikazi Rd, Lusaka, Zambia',
  coordinates: { lat: -15.3887641, lng: 28.2612351 },
  phone: '+260 974 135 737',
  whatsapp: '+260974135737',
  hours: 'Open 24/7 — reception always staffed',
  facebook: 'https://www.facebook.com/profile.php?id=61558718952115',
  footerCredit: 'Designed by Prolink Creatives',
} as const;

export const rooms = [
  {
    id: 'standard',
    name: 'Standard Room',
    pricePerNight: 360,
    currency: 'ZMW',
  },
  {
    id: 'executive',
    name: 'Executive Room',
    pricePerNight: 2000,
    currency: 'ZMW',
  },
] as const;

export const reviews = [
  { author: 'Bwembia Andy', rating: 5, quote: 'Splendid experience.' },
  { author: 'Lameck Chirwa', rating: 4, quote: 'Affordable pricing and worth every penny.' },
  { author: 'Evans Moyo', rating: 5, quote: 'Simply exceptional.' },
] as const;
