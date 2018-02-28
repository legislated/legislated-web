// @flow
import '@/styles/globals'
import React from 'react'
import { AppError } from './AppError'
import { AppHead } from './AppHead'
import { Layout } from './Layout'
import { Router } from '../scenes'

export const App = () => (
  <AppError>
    <AppHead />
    <Layout>
      <Router />
    </Layout>
  </AppError>
)
