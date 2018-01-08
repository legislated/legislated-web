// @flow
import '@/styles/rehydrate'
import React from 'react'
import { renderReact } from 'hypernova-react'
import { BrowserRouter } from 'react-router-dom'
import { ScrollContext } from 'react-router-scroll-4'
import { App } from '../src/App'

export default renderReact('client', () => (
  <BrowserRouter>
    <ScrollContext>
      <App />
    </ScrollContext>
  </BrowserRouter>
))
