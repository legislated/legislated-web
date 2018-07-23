// @flow
import { omit } from 'lodash'
import { config } from '@/config'

export function now () {
  return new Date()
}

export function sleep (duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export function alpha (hex: string, value: number): string {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xFF
  const g = (rgb >> 8) & 0xFF
  const b = (rgb >> 0) & 0xFF
  return `rgba(${r}, ${g}, ${b}, ${value})`
}

export function removeRouterProps (props: Object) {
  return omit(props, [
    'location',
    'history',
    'match',
    'staticContext'
  ])
}

export function href () {
  return config.isClient ? window.location.href : null
}
