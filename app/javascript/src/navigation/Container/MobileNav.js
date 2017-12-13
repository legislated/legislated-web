// @flow
import React, { Component } from 'react'
import { css } from 'glamor'
import { MobileNavButton } from './MobileNavButton'
import { NavLinkList } from './NavLinkList'
import { stylesheet, colors, alpha, mixins } from 'shared/styles'

export class MobileNav extends Component {
  state = {
    isOpen: false
  }

  // events
  didClickButton = () => {
    this.setState({ isOpen: true })
  }

  didClickOverlay = () => {
    this.setState({ isOpen: false })
  }

  didClickLink = () => {
    this.setState({ isOpen: false })
  }

  // lifecycle
  render () {
    const { isOpen } = this.state
    return <div {...rules.mobile}>
      <MobileNavButton onClick={this.didClickButton} />
      <div {...css(rules.nav, isOpen && rules.open)} onClick={this.didClickOverlay}>
        <div>
          <NavLinkList styles={rules.links} onClick={this.didClickLink} showsIcons />
        </div>
      </div>
    </div>
  }
}

const menuWidth = 240
const rules = stylesheet({
  mobile: {
    display: 'none',
    ...mixins.mobile({
      display: 'block'
    })
  },
  nav: {
    visibility: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backroundColor: 'transparent',
    transition: 'background-color 0.25s ease-out, visibility 0.25s',
    '> div': {
      position: 'absolute',
      top: 0,
      right: -menuWidth,
      width: menuWidth,
      height: '100%',
      zIndex: 2,
      backgroundColor: colors.white,
      transition: 'right 0.25s ease-out'
    }
  },
  open: {
    visibility: 'visible',
    backgroundColor: alpha(colors.black, 0.3),
    '> div': {
      right: 0
    }
  },
  links: {
    padding: 30
  }
})
