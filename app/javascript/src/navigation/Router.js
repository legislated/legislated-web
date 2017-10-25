// @flow
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ScrollContext } from 'react-router-scroll'
import { Routes } from './Routes'
import { Container } from './components'

export const Router = () => (
  <BrowserRouter>
    <ScrollContext>
      <Container>
        <Routes />
      </Container>
    </ScrollContext>
  </BrowserRouter>
)
