// @flow
import * as React from 'react'
import { logo } from '../../../images'

type Props = {
  width: number,
  height: number,
  className?: string
}

export function HeaderIcon (props: Props) {
  return (
    <img
      src={logo}
      alt='Quill and Paper'
      style={{ width: props.width, height: props.height }}
      {...props}
    />
  )
}
