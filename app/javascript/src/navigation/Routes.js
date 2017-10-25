// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { RelayRoute } from './RelayRoute'
import { NotFoundView } from './components'
import { AdminRoutes } from './AdminRoutes'
import * as scenes from '../scenes'

export const Routes = () => (
  <Switch>
    <RelayRoute path='/' exact {...scenes.search} />
    <Route path='/about' {...scenes.about} />
    <Route path='/faq' {...scenes.faq} />
    <RelayRoute path='/bill/:id' {...scenes.bill} />
    <Route path='/admin' component={AdminRoutes} />
    <Route component={NotFoundView} />
  </Switch>
)
