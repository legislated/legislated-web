// @flow
import color from 'color'

export const colors = {
  black: '#1a1a1a',
  white: '#f9fdff',
  background: '#f9fdff',
  backgroundAccent: '#ebf5ff',
  neutral: '#ffffff',
  neutralShadow: '#def0fb',
  primary: '#ee5d45',
  primaryShadow: '#457dcb',
  primaryHighlight: '#6ba8ff',
  secondary: '#ff7575',
  newPrimary: '#EE5D45',
  light: '#1A1A1A'
}

export function alpha (hex: string, value: number): string {
  return color(hex).alpha(value).string()
}
