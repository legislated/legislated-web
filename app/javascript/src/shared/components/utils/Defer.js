// @flow
import * as React from 'react'
import { config } from '@/config'

type Props = {
  children: ?React.Node
}

export function Defer ({
  children
}: Props) {
  return config.isServer ? null : children
}
