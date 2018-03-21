// @flow
import '../server-polyfills'
import React from 'react'
import { toScript } from 'hypernova'
import { renderReact } from 'hypernova-react'
import { Helmet } from 'react-helmet'
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
    const helmet = Helmet.renderStatic()

    return `
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          <style>${css}</style>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          ${serializeRoot(html)}
          ${toScript({ key: 'emotion-ids' }, ids)}
          ${toScript({ key: 'relay-payloads' }, getPayloads())}
        </body>
      </html>
    `
  }
})
