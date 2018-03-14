/* eslint-env jest */
import { local, session } from '../storage'

function itBehavesLikeStorage (storage) {
  it('updates a value', () => {
    storage.set('key', 'test')
    expect(storage.get('key')).toEqual('test')
  })

  it('deletes a value', () => {
    storage.set('key', 'test')
    storage.set('key', null)
    expect(storage.get('key')).toBeUndefined()
  })
}

describe('local', () => {
  itBehavesLikeStorage(local)
})

describe('session', () => {
  itBehavesLikeStorage(session)
})
