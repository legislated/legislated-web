// @flow
import * as React from 'react'
import config from 'shared/config'

export function Defer ({ children }: { children: ?React.Node }) {
  return config.env === 'server' ? null : children
}
