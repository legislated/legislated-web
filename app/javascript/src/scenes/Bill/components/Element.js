// @flow
import * as React from 'react'

type Props = {
  label: string,
  children?: React.Node
}

export function Element ({ label, children }: Props) {
  return (
    <div>
      <h3>{label}</h3>
      <p>{children}</p>
    </div>
  )
}
