// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from 'glamor'
import { Sticky } from 'react-sticky'
import { stylesheet, colors, alpha, mixins } from 'shared/styles'
import logo from '../../../images/logo.png'

export class Header extends Component {
  // lifecycle
  render () {
    return (
      <div>
        <div {...rules.headerLogo}>
          <Link {...rules.logoLink} to='/'>
            <img src={logo} alt='Legislated' height='40' width='40' />
          </Link>
          <Link {...rules.logoLink} to='/'>
            <span>Legislated</span>
          </Link>
        </div>
        <Sticky {...rules.header} topOffset={280}>
          {({ isSticky, style, wasSticky }) => {
            return (
              <div {...rules.headerNav} style={style}>
                <div {...rules.headerNavLeft}>
                  <Link {...css(rules.logoLink, isSticky ? null : rules.logoLinkHidden)} to='/'>
                    <img src={logo} alt='Legislated' height='40' width='40' />
                    <span>LEGISLATED</span>
                  </Link>
                </div>
                <div {...rules.headerNavCenter}>
                  <Link to='/'>Home</Link>
                  <Link to='/'>Bills</Link>
                  <Link to='/'>FAQ</Link>
                  <Link to='/'>About</Link>
                </div>
              </div>
            )
          }}
        </Sticky>
      </div>
    )
  }
}

const rules = stylesheet({
  logoLink: {
    color: colors.black,
    fontSize: 32,
    textDecoration: 'none',
    transition: 'color 0.25s, opacity 0.25s',
    opacity: 1,
    ':hover': {
      color: alpha(colors.black, 0.6)
    },
    '> img': {
      verticalAlign: 'top'
    },
    '> span:last-child': {
      ...mixins.fonts.bold,
      marginLeft: 15,
      letterSpacing: 5
    },
    ...mixins.mobile({
      fontSize: 28
    })
  },
  logoLinkHidden: {
    opacity: 0
  },
  headerNav: {
    display: 'flex',
    flexFlow: 'row nowrap',
    height: 85,
    backgroundColor: 'white',
    zIndex: '1'

  },
  headerNavLeft: {
    flex: '0 1 25%',
    margin: 'auto 0'
  },
  headerNavCenter: {
    flex: '0 1 50%',
    display: 'flex',
    flexFlow: 'row nowrap',
    '> a': {
      flex: '1 1 auto',
      textAlign: 'center',
      textTransform: 'uppercase',
      borderBottom: '7px solid white',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center'
    }
  },
  headerLogo: {
    height: 280,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  headerLogoIcon: {
    fontSize: 64
  },
  headerLogoTitle: {
    fontWeight: 'bold',
    fontSize: 64
  }
})
