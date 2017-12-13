// @flow
import '../server-polyfills'
import React from 'react'
import { renderReact } from 'hypernova-react'
import { StaticRouter } from 'react-router-dom'
import { renderStatic } from 'glamor/server'
import { App } from '../src/App'
import { getPayloads } from '../src/shared/relay/createQuery/createQuery.server'

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
    const { html, css, ids } = renderStatic(() => markup)

    return `
      <head><style>${css}</style></head>
      <body>
        ${serializeRoot(html)}
        <script>window._glam = ${JSON.stringify(ids)}</script>
        <script>window._payloads = ${JSON.stringify(getPayloads())}</script>
      </body>
    `
  }
})
