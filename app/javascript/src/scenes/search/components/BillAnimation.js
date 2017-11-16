// @flow
import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { stylesheet } from 'shared/styles'

const translation = 50
const duration = 450

export class BillAnimation extends Component {
  props: {
    disable?: boolean,
    disableAppear?: boolean,
    children?: any
  }

  render () {
    const { disable, disableAppear } = this.props

    const name = {
      enter: String(rules.enter),
      enterActive: String(rules.enterActive),
      appear: String(rules.enter),
      appearActive: String(rules.enterActive),
      leave: String(rules.leave),
      leaveActive: String(rules.leaveActive)
    }

    return <CSSTransitionGroup
      transitionName={name}
      transitionAppear={!disable && !disableAppear}
      transitionEnter={!disable}
      transitionLeave={!disable}
      transitionAppearTimeout={duration}
      transitionEnterTimeout={duration}
      transitionLeaveTimeout={duration}
    >
      {this.props.children}
    </CSSTransitionGroup>
  }
}

const rules = stylesheet({
  bill: {
    transition: `opacity ${duration}ms, transform ${duration}ms`
  },
  enter: {
    opacity: 0.01,
    transform: `translateY(${translation}px)`
  },
  enterActive: {
    opacity: 1.0,
    transform: 'none'
  },
  leave: {
    opacity: 1.0
  },
  leaveActive: {
    opacity: 0.1
  }
})

export const billRule = rules.bill
