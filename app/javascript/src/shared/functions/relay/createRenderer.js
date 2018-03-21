// @flow
import * as React from 'react'
import { type GraphQLTaggedNode } from 'react-relay'
import { type ContextRouter } from 'react-router-dom'
import { RelayRenderer } from '@/components'

type BaseComponent
  = React.ComponentType<*>

type Config = {|
  query: GraphQLTaggedNode,
  getVariables?: (ContextRouter) => Object,
|}

function getName (Component: BaseComponent) {
  return `Renderer(${Component.displayName || Component.name})`
}

export function createRenderer (Component: BaseComponent, query: GraphQLTaggedNode) {
  return createRendererWithConfig(Component, { query })
}

export function createRendererWithConfig (Component: BaseComponent, config: Config) {
  return class extends React.Component<*> {
    static displayName = getName(Component)

    render () {
      return (
        <RelayRenderer
          root={Component}
          {...config}
        />
      )
    }
  }
}
