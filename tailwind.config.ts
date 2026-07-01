import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#fbf9f8',
        'surface-dim': '#dbdad9',
        'surface-bright': '#fbf9f8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f3f3',
        'surface-container': '#efeded',
        'surface-container-high': '#e9e8e7',
        'surface-container-highest': '#e3e2e2',
        'on-surface': '#1b1c1c',
        'on-surface-variant': '#414944',
        outline: '#717974',
        'outline-variant': '#c0c9c2',

        primary: '#001f14',
        'on-primary': '#ffffff',
        'primary-container': '#013626',
        'on-primary-container': '#71a08b',

        secondary: '#755b00',
        'on-secondary': '#ffffff',
        'secondary-container': '#fed979',
        'on-secondary-container': '#785d03',

        tertiary: '#1a1a1a',
        'on-tertiary': '#ffffff',

        'forest-green': '#013626',
        'forest-green-deep': '#001f14',
        'warm-gold': '#755b00',
        'warm-gold-bright': '#e6c366',
        'soft-beige': '#f0eded',
        'ivory-white': '#fcf9f8',
        bronze: '#8a6a3f',
        wood: '#5c4530',
        stone: '#cfc9c0',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['28px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'label-md': ['14px', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '1.0', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        gutter: '24px',
        'margin-mobile': '16px',
        'section-v': '80px',
      },
      maxWidth: {
        content: '1200px',
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config;
