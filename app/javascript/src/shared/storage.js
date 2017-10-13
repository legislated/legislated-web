/* globals Storage, localStorage, sessionStorage */
// @flow

function namespaceKey (key: string): string {
  return `@@legislated/${key}`
}

class Store<K: string> {
  storage: Storage

  constructor (storage: Storage) {
    this.storage = storage
  }

  set (key: K, value: ?string) {
    const actualKey = namespaceKey(key)

    if (value) {
      this.storage.setItem(actualKey, value)
    } else {
      this.storage.removeItem(actualKey)
    }
  }

  get (key: K): ?string {
    const actualKey = namespaceKey(key)
    return this.storage.getItem(actualKey)
  }
}

type LocalStoreKey
  = 'intro-visited'
  | 'intro-cleared'

type SessionStoreKey
  = 'last-search-count'
  | 'admin-header'

export const local: Store<LocalStoreKey> = new Store(localStorage)
export const session: Store<SessionStoreKey> = new Store(sessionStorage)
