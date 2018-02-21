// @flow
import '../server-polyfills'
import React from 'react'
import { toScript } from 'hypernova'
import { renderReact } from 'hypernova-react'
import { StaticRouter } from 'react-router-dom'
import { extractCritical } from 'emotion-server'
import { App } from '../src/App'
import { getPayloads } from '@/functions/relay/createQuery/createQuery.server'

type Props = {
  location: string
}

export default renderReact('client', ({ location }: Props) => (
  <StaticRouter
    location={location}
    context={{}}
  >
    <App />
  </StaticRouter>
), {
  serialize (markup, serializeRoot) {
    const { html, css, ids } = extractCritical(markup)

    return `
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${serializeRoot(html)}
        ${toScript({ key: 'emotion-ids' }, ids)}
        ${toScript({ key: 'relay-payloads' }, getPayloads())}
      </body>
    `
  }
})
