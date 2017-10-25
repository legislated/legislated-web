// @flow
import type { ContextRouter } from 'react-router-dom'
import type { GraphQL } from 'react-relay'
import type { RelayCacheResovler } from './relay'

export type RouteConfig = {
  component: Class<React$Component<*, *, *>>
}

export type RelayRouteConfig = {
  query: GraphQL,
  render: ?Object => ?React$Element<*>,
  getInitialVariables?: (ContextRouter) => Object,
  cacheResolver?: RelayCacheResovler
}
