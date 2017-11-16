// @flow
import '../server-polyfills'
import React from 'react'
import { renderReact } from 'hypernova-react'
import { StaticRouter } from 'react-router-dom'
import { App } from '../src/App'

type Props = {
  location: string
}

export default renderReact('server', ({ location }: Props) => {
  return (
    <StaticRouter
      location={location}
      context={{}}
    >
      <App />
    </StaticRouter>
  )
})
