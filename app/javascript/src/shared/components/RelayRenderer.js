// @flow
import * as React from 'react'
import { QueryRenderer } from 'react-relay'
import type { GraphQL } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { currentEnvironment, cacheResolvers } from '@/relay'
import type { RelayCacheResovler } from '@/types'

type Props = {
  root: Class<React$Component<*, *, *>>,
  query: GraphQL,
  getVariables?: (ContextRouter) => Object,
  cacheResolver?: RelayCacheResovler
} & ContextRouter

let RelayRenderer = class RelayRenderer extends React.Component<*, Props, *> {
  // lifecycle
  componentWillMount () {
    const { cacheResolver } = this.props
    cacheResolver && cacheResolvers.add(cacheResolver)
  }

  componentWillUnmount () {
    const { cacheResolver } = this.props
    cacheResolver && cacheResolvers.remove(cacheResolver)
  }

  render () {
    const {
      root: Root,
      query,
      getVariables,
      match
    } = this.props

    // merge config variables and route variables
    const initialVariables = getVariables && getVariables(this.props)
    const variables = {
      ...initialVariables,
      ...match.params
    }

    return (
      <QueryRenderer
        environment={currentEnvironment()}
        query={query}
        variables={variables}
        render={({ error, props }: { error: ?Error, props: ?Object }) => {
          if (error) {
            throw error
          } else if (props && props.viewer) {
            return <Root {...props} />
          } else {
            return <Root viewer={null} />
          }
        }}
      />
    )
  }
}

RelayRenderer = withRouter(RelayRenderer)

export { RelayRenderer }
