// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'react-emotion'
import { MobileNav } from './MobileNav'
import { logo } from '../../../images'
import { colors, alpha, mixins } from 'shared/styles'

export function MobileHeader () {
  return (
    <Header>
      <LogoLink to='/'>
        <img src={logo} alt='Legislated' height='40' width='40' />
        <span>LEGISLATED</span>
      </LogoLink>
      <MobileNav />
    </Header>
  )
}

const Header = styled.header`
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 60px;
  background-color: white;
  display: none;
  padding: 0 7px;
  z-index: 2;
  position: relative;

  > * {
    &:first-child {
      display: flex;
      flex-flow: row nowrap;
    }

    &:last-child {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
    }
  }

  a {
    font-size: 28px;

    &:first-child {
      margin-right: 15px;
    }
  }

  @media (max-width: 700px) {
    display: flex;
  }
`

const LogoLink = styled(Link)`
  color: ${colors.black};
  ${css(mixins.fonts.bold)};
  text-decoration: none;
  transition: color 0.25s;
  letter-spacing: 5;
  ${css(mixins.centerVertically)};

  &:hover {
    color: ${alpha(colors.black, 0.6)};
  }
`
