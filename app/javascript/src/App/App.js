// @flow
import '@/styles/globals'
import React from 'react'

import { Layout } from './Layout'
import { AppHead } from './AppHead'
import { AppError } from './AppError'
import { Scenes } from '../Scenes'

export const App = () => (
  <AppError>
    <AppHead />
    <Layout>
      <Scenes />
    </Layout>
  </AppError>
)
