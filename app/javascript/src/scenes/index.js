// @flow
import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './Home'
import { Bills } from './Bills'
import { Bill } from './Bill'
import { About } from './About'
import { Help } from './Help'

export const Router = () => (
  <Switch>
    <Route path='/bills' component={Bills} />
    <Route path='/bill/:id' component={Bill} />
    <Route path='/about' component={About} />
    <Route path='/faq' component={Help} />
    <Route path='/' component={Home} />
    <Redirect to='/' />
  </Switch>
)
