// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { RelayRoute } from './RelayRoute'
import * as scenes from '../scenes'
import { isSignedIn } from '@/functions'

const Filter = (props: ContextRouter) => {
  const didMatchSignIn = props.location.pathname === '/admin/sign-in'

  if (!isSignedIn() && !didMatchSignIn) {
    return <Redirect to='/admin/sign-in' />
  } else if (isSignedIn() && didMatchSignIn) {
    return <Redirect to='/admin/bills' />
  } else {
    return <Routes {...props} />
  }
}

const Routes = (props: ContextRouter) => (
  <Switch>
    <Route path='/admin/sign-in' {...scenes.adminAuth} />
    <RelayRoute path='/admin/bills' {...scenes.adminBills} />
    <Redirect to='/admin/sign-in' />
  </Switch>
)

export { Filter as AdminRoutes }
