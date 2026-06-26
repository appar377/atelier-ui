export const themeNames = ['neutral', 'warm', 'cafe', 'forest', 'ocean', 'mono', 'play', 'dark'] as const

export type AtelierTheme = (typeof themeNames)[number]

export type AtelierDensity = 'compact' | 'comfortable' | 'spacious'
export type AtelierSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AtelierRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type AtelierIntent = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type AtelierFontPreset = 'sans' | 'serif' | 'mono' | 'rounded'

export const tokens = {
  color: {
    white: '#ffffff',
    black: '#111111',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      500: '#6b7280',
      700: '#374151',
      900: '#111827',
    },
    red: {
      500: '#ef4444',
      700: '#b91c1c',
    },
    orange: {
      500: '#f59e0b',
      700: '#b45309',
    },
    green: {
      500: '#22c55e',
      700: '#15803d',
    },
    blue: {
      500: '#3b82f6',
      700: '#1d4ed8',
    },
  },
  space: {
    0: '0px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
  radius: {
    none: '0px',
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  font: {
    sans: 'Inter, "Noto Sans JP", system-ui, sans-serif',
    serif: '"Noto Serif JP", Georgia, serif',
    mono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
    rounded: '"M PLUS Rounded 1c", "Noto Sans JP", system-ui, sans-serif',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },
  shadow: {
    none: 'none',
    xs: '0 1px 2px rgb(15 23 42 / 0.06)',
    sm: '0 2px 8px rgb(15 23 42 / 0.08)',
    md: '0 8px 24px rgb(15 23 42 / 0.10)',
    lg: '0 16px 48px rgb(15 23 42 / 0.14)',
  },
  controlHeight: {
    xs: '26px',
    sm: '32px',
    md: '38px',
    lg: '44px',
    xl: '52px',
  },
  motion: {
    fast: '120ms cubic-bezier(0.2, 0, 0, 1)',
    normal: '180ms cubic-bezier(0.2, 0, 0, 1)',
  },
} as const

export const themes = {
  neutral: {
    bg: '#ffffff',
    surface: '#f8fafc',
    surfaceRaised: '#ffffff',
    border: '#e5e7eb',
    text: '#111827',
    muted: '#6b7280',
    primary: '#3b82f6',
  },
  warm: {
    bg: '#fffaf3',
    surface: '#fff7ed',
    surfaceRaised: '#ffffff',
    border: '#eadfd2',
    text: '#2f2a24',
    muted: '#74685d',
    primary: '#c47a3c',
  },
  cafe: {
    bg: '#fbf7f0',
    surface: '#fffaf2',
    surfaceRaised: '#ffffff',
    border: '#e8dccb',
    text: '#2f2118',
    muted: '#7a6250',
    primary: '#8b5e34',
  },
  forest: {
    bg: '#f5f8f4',
    surface: '#fbfdf9',
    surfaceRaised: '#ffffff',
    border: '#dbe7d8',
    text: '#17251c',
    muted: '#5d6f61',
    primary: '#3f7d4a',
  },
  ocean: {
    bg: '#f4f9fc',
    surface: '#f8fcff',
    surfaceRaised: '#ffffff',
    border: '#d7e7f0',
    text: '#102331',
    muted: '#607483',
    primary: '#2f80a8',
  },
  mono: {
    bg: '#ffffff',
    surface: '#f4f4f5',
    surfaceRaised: '#ffffff',
    border: '#d4d4d8',
    text: '#18181b',
    muted: '#71717a',
    primary: '#27272a',
  },
  play: {
    bg: '#fffdf7',
    surface: '#ffffff',
    surfaceRaised: '#ffffff',
    border: '#ece2cf',
    text: '#202124',
    muted: '#6b6570',
    primary: '#6d5dfc',
  },
  dark: {
    bg: '#111318',
    surface: '#171a21',
    surfaceRaised: '#1f2430',
    border: '#2a303d',
    text: '#f3f4f6',
    muted: '#a1a7b3',
    primary: '#7aa2ff',
  },
} as const
