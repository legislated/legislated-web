// @flow
import { session } from 'shared/storage'
import { events } from 'shared/events'
import { Base64 } from 'js-base64'

export const auth = {
  get isSignedIn (): boolean {
    return !!session.get('admin-header')
  },
  signIn (username: string, password: string) {
    const authValue = Base64.encode(`${username}:${password}£`)
    const authHeader = `Basic ${authValue}`
    session.set('admin-header', authHeader)
    events.emit(events.setAuthHeader, authHeader)
  },
  signOut () {
    session.set('admin-header', null)
    events.emit(events.setAuthHeader, null)
  }
}
