// @flow
import color from 'color'

export const colors = {
  black: '#000000',
  white: '#f9fdff',
  background: '#f9fdff',
  backgroundAccent: '#ebf5ff',
  neutral: '#ffffff',
  neutralShadow: '#def0fb',
  primary: '#5498f7',
  primaryShadow: '#457dcb',
  primaryHighlight: '#6ba8ff',
  secondary: '#ff7575'
}

export function alpha (hex: string, value: number): string {
  return color(hex).alpha(value).string()
}
