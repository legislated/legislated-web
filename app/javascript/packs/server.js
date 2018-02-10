// @flow
import '../server-polyfills'
import React from 'react'
import { renderReact } from 'hypernova-react'
import { StaticRouter } from 'react-router-dom'
// import { renderStatic } from 'glamor/server'
import { App } from '../src/App'
import { getPayloads } from '@/relay/createQuery/createQuery.server'

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
    const html = markup

    // const { html, css, ids } = renderStatic(() => markup)
    // <head><style>${css}</style></head>
    // <script>window._glam = ${JSON.stringify(ids)}</script>

    return `
      <body>
        ${serializeRoot(html)}
        <script>window._payloads = ${JSON.stringify(getPayloads())}</script>
      </body>
    `
  }
})
