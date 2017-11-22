// @flow
import '../server-polyfills'
import React from 'react'
import { renderReact } from 'hypernova-react'
import { StaticRouter } from 'react-router-dom'
import { renderStatic } from 'glamor/server'
import { App } from '../src/App'

type Props = {
  location: string
}

export default renderReact('server', ({ location }: Props) => (
  <StaticRouter
    location={location}
    context={{}}
  >
    <App />
  </StaticRouter>
), {
  serialize (renderToString, serializeHtml) {
    const { html, css, ids } = renderStatic(renderToString)

    return `
      <head><style>${css}</style></head>
      <body>
        ${serializeHtml(html)}
        <script>window._glam = ${JSON.stringify(ids)}</script>
      </body>
    `
  }
})
