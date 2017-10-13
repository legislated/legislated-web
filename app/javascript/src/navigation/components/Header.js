// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MobileNav } from './MobileNav'
import { NavLinkList } from './NavLinkList'
import { stylesheet, colors, alpha, mixins } from 'shared/styles'

export class Header extends Component {
  // lifecycle
  render () {
    return <div {...rules.container}>
      <Link {...rules.logoLink} to='/'>
        <img src='/assets/logo.png' alt='Legislated' height='40' width='40' />
        <span>LEGISLATED</span>
      </Link>
      <MobileNav />
      <div {...rules.nav}>
        <NavLinkList />
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    ...mixins.borders.low(['bottom']),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: alpha(colors.background, 0.95),
    ...mixins.mobile({
      height: 60,
      paddingLeft: 15,
      paddingRight: 15
    })
  },
  logoLink: {
    color: colors.black,
    fontSize: 32,
    textDecoration: 'none',
    transition: 'color 0.25s',
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
  nav: {
    ...mixins.borders.low(['left']),
    flex: 1,
    display: 'flex',
    marginLeft: 15,
    paddingLeft: 15,
    ...mixins.mobile({
      display: 'none'
    })
  }
})
