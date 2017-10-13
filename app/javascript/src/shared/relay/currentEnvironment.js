// @flow
import { Environment, RecordSource, Store, Network } from 'relay-runtime'
import { events } from 'shared/events'
import { createQuery } from './createQuery'

// current environment
let environment = createEnvironment()

function didSetAuthHeader (header: string) {
  environment = createEnvironment({ 'Authorization': header })
  events.emit(events.setEnvironment)
}

export function currentEnvironment (): Object {
  return environment
}

events.on(events.setAuthHeader, didSetAuthHeader)

// see: https://facebook.github.io/relay/docs/relay-environment.html
function createEnvironment (headers: Object = {}): Object {
  const source = new RecordSource()
  const store = new Store(source)
  const network = Network.create(createQuery(headers))

  return new Environment({ store, network })
}
