// @flow
import EventEmitter from 'eventemitter3'

class Events extends EventEmitter {
  setAuthHeader = '@@events/set-auth-header'
  setEnvironment = '@@events/set-environment'
}

export const events = new Events()
