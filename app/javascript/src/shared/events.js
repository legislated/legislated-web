// @flow
import EventEmitter from 'eventemitter3'

class Events extends EventEmitter {
  setAuthHeader = '@@events/set-auth-header'
  setEnvironment = '@@events/set-environment'
  showNotification = '@@events/show-notification'
}

export const events = new Events()
