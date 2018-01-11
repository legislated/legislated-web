// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { NavLinks } from '../NavLinks'
import { colors, mixins } from '@/styles'
import { alpha } from '@/functions'

export const MOBILE_MENU_WIDTH = 260

type Props = {|
  onClose: () => void
|}

export function MobileMenu ({
  onClose
}: Props) {
  return (
    <Menu onClick={onClose}>
      <Background />
      <Links onClick={onClose} />
    </Menu>
  )
}

const Menu = styled.div`
  ${mixins.fill};
  position: fixed;
`

const Background = styled.div`
  ${mixins.fill};
  position: absolute;
  background-color: ${alpha(colors.black, 0.7)};
`

const Links = styled(NavLinks)`
  position: absolute;
  width: ${MOBILE_MENU_WIDTH}px;
  height: 100%;
  right: 0;
  padding: 20px;
  background-color: ${colors.white};
`
