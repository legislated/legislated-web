// @flow
import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './Home'
import { Bills } from './Bills'
import { Bill } from './Bill'
import { aboutRoute as about } from './about'
import { faqRoute as faq } from './faq'

export const Router = () => (
  <Switch>
    <Route path='/bills' component={Bills} />
    <Route path='/bill/:id' component={Bill} />
    <Route path='/about' {...about} />
    <Route path='/faq' {...faq} />
    <Route path='/' component={Home} />
    <Redirect to='/' />
  </Switch>
)
