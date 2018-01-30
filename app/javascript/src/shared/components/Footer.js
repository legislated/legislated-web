// @flow
import * as React from 'react'
// $FlowFixMe: upgrade flow && flow-typed defs
import { createPortal } from 'react-dom'
import { config } from '@/config'

type Props = {
  children?: React.Node
}

const root = config.env !== 'server'
  ? document.getElementById('footer-root')
  : null

export function Footer ({ children }: Props) {
  return root && createPortal(children, root)
}
