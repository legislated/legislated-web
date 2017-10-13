// @flow
import React, { Component } from 'react'
import { stylesheet, colors } from 'shared/styles'

export class MobileNavButton extends Component {
  props: {|
    onClick: Function
  |}

  // lifecycle
  render () {
    return <button type='button' {...rules.hamburger} {...this.props}>
      <span />
      <span />
      <span />
    </button>
  }
}

const rules = stylesheet({
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 32,
    transition: 'opacity 0.15s linear',
    '&:focus': {
      outline: 'none'
    },
    '&:hover, &:active': {
      opacity: 0.6
    },
    '> span': {
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.black
    },
    '> span:not(:last-child)': {
      marginBottom: 5
    }
  }
})
