// @flow
import * as React from 'react'
import { QueryRenderer } from 'react-relay'
import type { GraphQLTaggedNode } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { currentEnvironment } from '@/functions'

type Props = {
  root: React.ComponentType<*>,
  query: GraphQLTaggedNode,
  getVariables?: (ContextRouter) => Object,
} & ContextRouter

let RelayRenderer = function RelayRenderer ({
  root: Root,
  query,
  getVariables,
  ...props
}: Props) {
  // merge config variables and route variables
  const initialVariables =
    // $FlowFixMe: intersection & rest/spread
    getVariables && getVariables(props)

  const variables = {
    ...initialVariables,
    ...props.match.params
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

RelayRenderer = withRouter(RelayRenderer)

export { RelayRenderer }
