// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { sleep } from '@/functions'
import type { Notification } from '@/types'
import { colors } from '@/styles'

const duration = 300

type State = {
  isHidden: boolean,
  notification: ?Notification
}

export class NotificationView extends React.Component<{}, State> {
  state = {
    isHidden: true,
    notification: null
  }

  // events
  didReceiveNotification = async (notification: Notification) => {
    const { notification: current } = this.state
    if (current) {
      return
    }

    this.setState({ notification, isHidden: false })
    await sleep(2000)
    this.setState({ isHidden: true })
    await sleep(duration)
    this.setState({ notification: null })
  }

  didDismissNotification = () => {
    this.setState({ notification: null })
  }

  // lifecycle
  render () {
    const {
      notification,
      isHidden
    } = this.state

    return null
  }
}

const Note = styled.div`
  position: 'fixed';
  bottom: 30px;
  right: ${({ isVisible }) => isVisible ? 30 : -245}px;
  width: 200px;
  padding: 15px;
  border: 1px solid ${colors.black};
  border-radius: 3px;
  background-color: ${colors.backgroundAccent};
  transition: right ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1);
`
