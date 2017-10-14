import React, { Component } from 'react'
import { routerProps } from 'mocks/routerProps'

// actual
const {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link
} = require.requireActual('react-router-dom')

// mocks
function withRouter (Wrapped) {
  return class Container extends Component {
    static get name () {
      return Wrapped.name
    }

    render () {
      return <Wrapped {...routerProps} {...this.props} />
    }
  }
}

// interface
export {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
}
