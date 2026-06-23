// Design tokens lifted verbatim from the Claude Design "Visual Guide" export so
// the React rebuild matches the original Economist-style art direction exactly.

export const color = {
  red: '#E3120B',
  redDark: '#C40F09',
  redSoft: 'rgba(227, 18, 11, 0.10)',
  bg: '#FAF9F7',
  ink: '#121212',
  gray1: '#4A4A4A',
  gray2: '#6A6A6A',
  gray3: '#8A8A8A',
  rule: '#D8D4CC',
  fill: '#F0EDE8',
  green: '#4A8A5A',
  blue: '#4A6A9A',
  panel: '#121212',
  white: '#ffffff',
} as const;

export const font = {
  display: "'Playfair Display', Georgia, serif",
  sans: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
  serif: "'IBM Plex Serif', Georgia, serif",
} as const;

// A small qualitative ramp used by multi-series charts. Built around the brand
// red so charts stay on-brand while remaining legible.
export const series = [
  '#E3120B',
  'rgba(227,18,11,0.62)',
  'rgba(227,18,11,0.38)',
  '#8A8A8A',
  '#B7B0A5',
  '#4A8A5A',
] as const;

export const layout = {
  maxWidth: 860,
} as const;
