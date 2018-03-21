// @flow
import * as React from 'react'
import { css } from 'react-emotion'
import { CSSTransitionGroup } from 'react-transition-group'

const enterDuration = 250
const leaveDuration = 150

type Props = {
  direction?: 'up' | 'down',
  disable?: boolean,
  disableAppear?: boolean,
  children?: React.Node
}

export function TranslateAndFade ({
  direction,
  disable,
  disableAppear,
  ...otherProps
}: Props) {
  const enter = (direction || 'up') === 'up' ? enterUp : enterDown
  const name = {
    enter,
    enterActive,
    appear: enter,
    appearActive: enterActive,
    leave,
    leaveActive
  }

  return (
    <CSSTransitionGroup
      transitionName={name}
      transitionAppear={!disable && !disableAppear}
      transitionEnter={!disable}
      transitionLeave={!disable}
      transitionAppearTimeout={enterDuration}
      transitionEnterTimeout={enterDuration}
      transitionLeaveTimeout={leaveDuration}
      {...otherProps}
    />
  )
}

const enterBase = css`
  opacity: 0.01;
  transition: opacity ${enterDuration}ms, transform ${enterDuration}ms;
`

const enterUp = css`
  ${enterBase};
  transform: translateY(20px)
`

const enterDown = css`
  ${enterBase};
  transform: translateY(-20px)
`

const enterActive = css`
  opacity: 1.0;
  transform: none;
`

const leave = css`
  opactiy: 1.0;
  transition: opacity ${leaveDuration}ms;
`

const leaveActive = css`
  opacity: 0.01;
`
