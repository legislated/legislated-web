// @flow
import '@/styles/globals'
import React from 'react'
import { AppError } from './AppError'
import { Layout } from './Layout'
import { Routes } from './Routes'

export const App = () => (
  <AppError>
    <Layout>
      <Routes />
    </Layout>
  </AppError>
)
