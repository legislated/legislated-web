// @flow
import color from 'color'
import { omit } from 'lodash'

export function sleep (duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export function alpha (hex: string, value: number): string {
  return color(hex).alpha(value).string()
}

export function removeRouterProps (props: Object) {
  return omit(props, [
    'location',
    'history',
    'match',
    'staticContext'
  ])
}
