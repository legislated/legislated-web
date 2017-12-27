// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'react-emotion'
import { HeaderIcon } from './HeaderIcon'
import { MobileNav } from './MobileNav'
import { colors, alpha, mixins } from 'shared/styles'

export function MobileHeader () {
  return (
    <Header>
      <LogoLink to='/'>
        <HeaderIcon height={40} width={40} />
        <h1>LEGISLATED</h1>
      </LogoLink>
      <MobileNav />
    </Header>
  )
}

const Header = styled.header`
  flex-flow: row;
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
  display: flex;
  align-items: center;
`
