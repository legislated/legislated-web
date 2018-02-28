// @flow
import '../server-polyfills'
import React from 'react'
import { renderReact } from 'hypernova-react'
import {Helmet} from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { renderStatic } from 'glamor/server'
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
    const { html, css, ids } = renderStatic(() => markup)
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
        <script>window._glam = ${JSON.stringify(ids)}</script>
        <script>window._payloads = ${JSON.stringify(getPayloads())}</script>
      </body>
    </html>
    `
  }
})
