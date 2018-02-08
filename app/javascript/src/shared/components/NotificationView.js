// @flow
import * as React from 'react'
import { css } from 'glamor'
import { events } from '@/events'
import { sleep } from '@/functions'
import type { Notification } from '@/types'
import { stylesheet, colors, mixins } from '@/styles'

const animationDuration = 300

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
    await sleep(animationDuration)
    this.setState({ notification: null })
  }

  didDismissNotification = () => {
    this.setState({ notification: null })
  }

  // lifecycle
  componentDidMount () {
    events.on(events.showNotification, this.didReceiveNotification)
  }

  componentWillUnmount () {
    events.off(events.showNotification, this.didReceiveNotification)
  }

  render () {
    const { notification, isHidden } = this.state
    return <div {...css(rules.notification, !isHidden && rules.visible)}>
      {notification && notification.message}
    </div>
  }
}

const rules = stylesheet({
  notification: {
    ...mixins.shadows.low,
    ...mixins.borders.low(),
    position: 'fixed',
    bottom: 30,
    right: -245,
    width: 200,
    padding: 15,
    borderRadius: 3,
    color: colors.black,
    backgroundColor: colors.backgroundAccent,
    transition: `right ${animationDuration}ms cubic-bezier(0.645, 0.045, 0.355, 1)`
  },
  visible: {
    right: 30
  }
})
