// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { RelayRoute } from './RelayRoute'
import { AdminRoutes } from './AdminRoutes'
import { NotFoundView } from './NotFoundView'
import { home, bill, about, faq, Bills } from '../../scenes'

export const Routes = () => (
  <Switch>
    <RelayRoute path='/' exact {...home} />
    <Route path='/bills' component={Bills} />
    <Route path='/about' {...about} />
    <Route path='/faq' {...faq} />
    <RelayRoute path='/bill/:id' {...bill} />
    <Route path='/admin' component={AdminRoutes} />
    <Route component={NotFoundView} />
  </Switch>
)
