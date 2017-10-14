import React, { Component } from 'react'
import { relayFragmentProp, relayRefetchProp, relayPaginationProp } from 'mocks/relayProps'

// mocks
class QueryRenderer {
}

function graphql (query) {
  return query
}

function createMockContainer (Wrapped, relayProp, container) {
  return class Container extends Component {
    static container = container
    static get name () {
      return Wrapped.name
    }

    render () {
      return <Wrapped relay={relayProp} {...this.props} />
    }
  }
}

function createFragmentContainer (Wrapped, fragment) {
  return createMockContainer(Wrapped, relayFragmentProp, {
    fragment
  })
}

function createRefetchContainer (Wrapped, fragment, query) {
  return createMockContainer(Wrapped, relayRefetchProp, {
    fragment,
    query
  })
}

function createPaginationContainer (Wrapped, fragment, options) {
  return createMockContainer(Wrapped, relayPaginationProp, {
    fragment,
    options
  })
}

// interface
export {
  QueryRenderer,
  graphql,
  createFragmentContainer,
  createRefetchContainer,
  createPaginationContainer
}
