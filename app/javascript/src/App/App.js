// @flow
import '@/styles/globals'
import React from 'react'
import { AppError } from './AppError'
import { Layout } from './Layout'
import { Router } from '../scenes'

export const App = () => (
  <AppError>
    <Layout>
      <Router />
    </Layout>
  </AppError>
)
