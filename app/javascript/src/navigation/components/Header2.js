// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { css } from 'glamor'
import { Sticky } from 'shared/components'
import { stylesheet, colors, alpha, mixins } from 'shared/styles'
import logo from '../../../images/logo.png'

class _Header extends Component {
  // lifecycle
  render () {
    const navLinkClasses = {
      className: `${rules.headerNavLink}`,
      activeClassName: `${rules.activeLink}`
    }

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
                  <NavLink to='/' exact {...navLinkClasses}>Home</NavLink>
                  <NavLink to='/faq' exact {...navLinkClasses}>FAQ</NavLink>
                  <NavLink to='/about' exact {...navLinkClasses}>About</NavLink>
                </div>
              </div>
            )
          }}
        </Sticky>
      </div>
    )
  }
}

export const Header = withRouter(_Header)

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
    flexFlow: 'row nowrap'
  },
  headerNavLink: {
    flex: '1 1 auto',
    textAlign: 'center',
    textTransform: 'uppercase',
    borderBottom: '7px solid white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    textDecoration: 'none',
    color: colors.light,
    fontWeight: mixins.fonts.light
  },
  activeLink: {
    color: colors.newPrimary,
    borderBottom: `7px solid ${colors.newPrimary}`
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
