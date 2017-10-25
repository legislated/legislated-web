// @flow
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Router } from './navigation'

// render application
render(<Router />, document.getElementById('root'))
