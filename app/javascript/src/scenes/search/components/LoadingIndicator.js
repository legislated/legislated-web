// @flow
import React, { Component } from 'react'
import { css } from 'glamor'
import { BillAnimation, billRule } from './BillAnimation'
import { stylesheet, colors, mixins } from 'shared/styles'

export class LoadingIndicator extends Component {
  props: {
    isLoading: boolean
  }

  // lifecycle
  render () {
    return <BillAnimation disableAppear>
      {this.renderIndicator()}
    </BillAnimation>
  }

  renderIndicator (): ?React$Element<*> {
    if (!this.props.isLoading) {
      return null
    }

    return <div key='indicator' {...css(rules.container, billRule)}>
      <div {...rules.topBar} />
      <div {...rules.bottomBar} />
    </div>
  }
}

function animation (start: string, end: string, duration: number): Object {
  return {
    animationName: css.keyframes({ from: { width: start }, to: { width: end } }),
    animationDuration: `${duration}s`,
    animationDirection: 'alternate',
    animationIterationCount: 'infinite'
  }
}

const bar = {
  height: 22,
  borderRadius: 3,
  backgroundColor: colors.neutralShadow
}

const rules = stylesheet({
  container: {
    ...mixins.shadows.low(),
    ...mixins.borders.low(),
    height: 49,
    padding: 15,
    marginBottom: 15,
    backgroundColor: colors.neutral
  },
  topBar: {
    ...bar,
    ...animation('10%', '13%', 1.5),
    marginBottom: 5
  },
  bottomBar: {
    ...bar,
    ...animation('8%', '15%', 1.2)
  }
})
