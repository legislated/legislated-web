// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { colors } from '@/styles'

type Props = {|
  onClick: Function
|}

export function MobileMenuButton (props: Props) {
  return (
    <Button type='button' {...props}>
      <Bar />
      <Bar />
      <Bar />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 32px;
  transition: opacity 0.15s;

  &:focus {
    outline: none;
  }

  &:hover, &:active {
    opacity: 0.6;
  }

  > * + * {
    margin-top: 8px;
  }
`

const Bar = styled.span`
  height: 2px;
  border-radius: 1px;
  background-color: ${colors.black};
`
