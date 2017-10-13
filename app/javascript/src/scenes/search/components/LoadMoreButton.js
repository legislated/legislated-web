// @flow
import React, { Component } from 'react'
import { css } from 'glamor'
import type { Rule } from 'glamor'
import { stylesheet, colors, mixins } from 'shared/styles'

export class LoadMoreButton extends Component {
  props: {
    hasMore: boolean,
    onClick: Function,
    styles?: Rule
  }

  // events
  didClickLink = () => {
    this.props.onClick()
  }

  // lifecycle
  render () {
    const { styles, hasMore } = this.props
    if (!hasMore) {
      return null
    }

    return <a {...css(rules.button, styles)} onClick={this.didClickLink}>
      Load More
    </a>
  }
}

const rules = stylesheet({
  button: {
    ...mixins.shadows.make(colors.primaryShadow, 5),
    height: 40,
    minWidth: 100,
    padding: '0 5%',
    fontSize: 18,
    lineHeight: '40px',
    textAlign: 'center',
    color: colors.white,
    backgroundColor: colors.primary,
    transition: 'background-color 0.25s',
    ':hover': {
      backgroundColor: colors.primaryHighlight
    }
  }
})
