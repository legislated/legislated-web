// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import { CSSTransitionGroup } from 'react-transition-group'
import { MOBILE_MENU_WIDTH } from './MobileMenu'

const duration = 350

type Props = {|
  children?: React.Node
|}

export function MobileMenuTransition (props: Props) {
  return (
    <CSSTransitionGroup
      component={Anchor}
      transitionName={name}
      transitionEnter
      transitionLeave
      transitionEnterTimeout={duration}
      transitionLeaveTimeout={duration}
      {...props}
    />
  )
}

const Anchor = styled.span`
  position: absolute;
`

const transitionable = css`
  > div {
    transition: opacity ${duration}ms;
  }

  > nav {
    transition: transform ${duration}ms;
  }
`

const visible = (isVisible) => css`
  > div {
    opacity: ${isVisible ? 1.0 : 0.01};
  }

  > nav {
    transform: translateX(${isVisible ? 0 : MOBILE_MENU_WIDTH}px);
  }
`

const name = {
  enter: css`
    ${transitionable};
    ${visible(false)};
  `,
  enterActive: visible(true),
  leave: css`
    ${transitionable}
  `,
  leaveActive: visible(false)
}
