/* eslint-env jest */
import { auth } from '../auth'
import { Base64 } from 'js-base64'
import { events } from 'shared/events'

// mocks
jest.mock('shared/events', () => ({
  events: {
    emit: jest.fn(),
    setAuthHeader: 'set-auth-header'
  }
}))

// subject
let subject = auth

// spec
describe('#isSignedIn', () => {
  it('is true when the user is signed in', () => {
    subject.signIn('username', 'password')
    expect(subject.isSignedIn).toBe(true)
  })

  it('is false when the user is signed out', () => {
    subject.signOut()
    expect(subject.isSignedIn).toBe(false)
  })
})

describe('#signIn', () => {
  it('signs the user in', () => {
    expect(subject.isSignedIn).toBe(false)
    subject.signIn('username', 'password')
    expect(subject.isSignedIn).toBe(true)
  })

  it('emits the set auth header on signin', () => {
    subject.signIn('username', 'password')
    const authValue = Base64.encode('username:password£')
    const authHeader = `Basic ${authValue}`
    expect(events.emit).toHaveBeenCalledWith(events.setAuthHeader, authHeader)
  })
})

describe('#signOut', () => {
  it('signs the user out', () => {
    subject.signOut()
    expect(subject.isSignedIn).toBe(false)
  })

  it('emits the set auth header on signout', () => {
    subject.signOut()
    expect(events.emit).toHaveBeenCalledWith(events.setAuthHeader, null)
  })
})
