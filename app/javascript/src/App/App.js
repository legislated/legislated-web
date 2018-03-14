// @flow
import '@/styles/globals'
import React from 'react'
import { Layout } from './Layout'
import { AppError } from './AppError'
import { Scenes } from '../Scenes'

export const App = () => (
  <AppError>
    <Layout>
      <Scenes />
    </Layout>
  </AppError>
)
