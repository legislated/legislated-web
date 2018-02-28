// @flow
import * as React from 'react'
import {Helmet} from 'react-helmet'
import { logotitle } from '&/images'

export function AppHead () {
  return (
    <Helmet>
      <meta charset='UTF-8' />
      <link rel='dns-prefetch' href='//maxcdn.bootstrapcdn.com/' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content='Your seat in state government' />
      <meta property='og:url' content='https://legislated.org/' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Legislated' />
      <meta property='og:title' content='Legislated' />
      <meta property='og:image' content={logotitle} />
      <meta property='og:description' content='Your seat in state government' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@WitnessSlipsIL' />
      <meta name='twitter:title' content='Legislated' />
      <meta name='twitter:description' content='Your seat in state government' />
      <meta name='twitter:image' content={logotitle} />
    </Helmet>
  )
}
