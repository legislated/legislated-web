import './fetch'
import { reset as resetStorage } from './storage'
import { reset as resetRouterProps } from './routerProps'

export function resetMocks () {
  resetStorage()
  resetRouterProps()
}
