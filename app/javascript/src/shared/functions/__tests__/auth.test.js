/* eslint-env jest */
import { isSignedIn, signIn, signOut } from '../auth'
import { Base64 } from 'js-base64'
import { events } from '@/events'

// mocks
jest.mock('@/events', () => ({
  events: {
    emit: jest.fn(),
    setAuthHeader: 'set-auth-header'
  }
}))

// spec
describe('#signIn', () => {
  it('signs the user in', () => {
    expect(isSignedIn()).toBe(false)
    signIn('username', 'password')
    expect(isSignedIn()).toBe(true)
  })

  it('emits the set auth header on signin', () => {
    signIn('username', 'password')
    const authValue = Base64.encode('username:password£')
    const authHeader = `Basic ${authValue}`
    expect(events.emit).toHaveBeenCalledWith(events.setAuthHeader, authHeader)
  })
})

describe('#signOut', () => {
  it('signs the user out', () => {
    signIn('username', 'password')
    signOut()
    expect(isSignedIn()).toBe(false)
  })

  it('emits the set auth header on signout', () => {
    signOut()
    expect(events.emit).toHaveBeenCalledWith(events.setAuthHeader, null)
  })
})
