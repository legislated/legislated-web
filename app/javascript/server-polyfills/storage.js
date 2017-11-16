// @flow
function storage () {
  let data: { [key: string]: string } = {}

  return {
    getItem (key: string) {
      return data[key] === undefined ? null : data[key]
    },
    setItem (key: string, value: any) {
      data[key] = value + '' // force to string
    },
    removeItem (key: string) {
      delete data[key]
    }
  }
}

global.localStorage = storage()
global.sessionStorage = storage()
