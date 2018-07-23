// @flow
import * as React from 'react'
import { createPortal } from 'react-dom'
import { config } from '@/config'

type Props = {
  children?: React.Node
}

const root = config.isClient
  ? document.getElementById('footer-root')
  : null

export function Footer ({ children }: Props) {
  return root && createPortal(children, root)
}
