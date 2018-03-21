// @flow
import * as React from 'react'
import Clipboard from 'react-copy-to-clipboard'
import { Link } from './Link'

type Props = {
  value: string,
  className?: string
}

export function CopyLink ({ value, className }: Props) {
  return (
    <Clipboard
      text={value}
      className={className}
    >
      <Link
        onClick={() => {}}
        children='Copy Link'
      />
    </Clipboard>
  )
}
