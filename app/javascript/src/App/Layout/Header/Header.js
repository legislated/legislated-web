// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { HeroHeader } from './HeroHeader'
import { HeaderNavbar } from './HeaderNavbar'

type Props =
  ContextRouter

let Header = function Header ({ match, location }: Props) {
  if (location.pathname === '/') {
    return <HeroHeader />
  } else {
    return <HeaderNavbar isSticky />
  }
}

Header = withRouter(Header)

export { Header }
