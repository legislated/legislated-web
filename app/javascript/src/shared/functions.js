// @flow
import { omit } from 'lodash'

export function withoutRouter (props: Object) {
  return omit(props, [
    'location',
    'history',
    'match',
    'staticContext'
  ])
}

export function sleep (duration: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration))
}
