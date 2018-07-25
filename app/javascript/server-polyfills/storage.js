// @flow
function storage () {
  return {
    getItem (key: string) {
      return null
    },
    setItem (key: string, value: any) {
    },
    removeItem (key: string) {
    }
  }
}

global.localStorage = storage()
global.sessionStorage = storage()
