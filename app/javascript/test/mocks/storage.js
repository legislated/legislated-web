export function reset () {
  global.localStorage.reset()
  global.sessionStorage.reset()
}

class MockStorage {
  data = {}

  reset () {
    this.data = {}
  }

  getItem (key) {
    return this.data[key]
  }

  setItem (key, value) {
    this.data[key] = value
  }

  removeItem (key) {
    delete this.data[key]
  }
}

global.localStorage = new MockStorage()
global.sessionStorage = new MockStorage()
