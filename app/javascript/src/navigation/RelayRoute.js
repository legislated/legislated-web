// @flow
import React, { Component } from 'react'
import { QueryRenderer } from 'react-relay'
import { Route } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { currentEnvironment, cacheResolvers } from 'shared/relay'
import { events } from 'shared/events'
import type { RelayRouteConfig } from 'shared/types'

export class RelayRoute extends Component {
  props: {
    path: string,
    exact?: boolean
  } & RelayRouteConfig

  render () {
    const { props } = this
    const { path, exact, ...rest } = props

    // ...rest not playing nicely with flow for some reason
    const config = {
      ...rest,
      query: props.query,
      render: props.render
    }

    return <Route
      path={path}
      exact={exact}
      component={withRelay(config)}
    />
  }
}

const withRelay = (config: RelayRouteConfig) => (
  class Container extends Component {
    props: ContextRouter

    state: { environment: Object } = {
      environment: currentEnvironment()
    }

    // events
    didSetEnvironment = () => {
      this.setState({ environment: currentEnvironment() })
    }

    // lifecycle
    componentWillMount () {
      events.on(events.setEnvironment, this.didSetEnvironment)

      const { cacheResolver } = config
      if (cacheResolver) {
        cacheResolvers.add(cacheResolver)
      }
    }

    componentWillUnmount () {
      events.off(events.setEnvironment, this.didSetEnvironment)

      const { cacheResolver } = config
      if (cacheResolver) {
        cacheResolvers.remove(cacheResolver)
      }
    }

    render () {
      const { environment } = this.state
      const { query, getInitialVariables, render } = config
      const { params } = this.props.match

      // merge config variables and route variables
      const initialVariables = getInitialVariables && getInitialVariables(this.props)
      const variables = {
        ...initialVariables,
        ...params
      }

      return <QueryRenderer
        environment={environment}
        query={query}
        variables={variables}
        render={({ error, props }: { error: ?Error, props: ?Object }) => {
          if (error) {
            throw new Error(error) // TODO: show error view
          }

          return render(props)
        }}
      />
    }
  }
)
