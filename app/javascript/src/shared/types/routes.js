// @flow
import * as React from 'react'
import type { ContextRouter } from 'react-router-dom'
import type { GraphQLTaggedNode } from 'react-relay'

export type RouteConfig = {
  component: React.ComponentType<*>
}

export type RelayRouteConfig = {
  query: GraphQLTaggedNode,
  render: ?Object => ?React.Element<*>,
  getInitialVariables?: (ContextRouter) => Object
}
