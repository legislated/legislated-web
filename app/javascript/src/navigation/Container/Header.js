// @flow
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled, { css } from 'react-emotion'
import { Sticky } from 'shared/components'
import { colors, alpha, mixins } from 'shared/styles'
import logo from '../../../images/logo.png'
import { MobileNav } from './MobileNav'

export class Header extends Component {
  // lifecycle
  render () {
    return (
      <div>
        <DesktopHeader>
          <HeroLogo>
            <LogoLink to='/'>
              <img src={logo} alt='Legislated' height='64' width='64' />
            </LogoLink>
            <LogoLink to='/'>
              <span>Legislated</span>
            </LogoLink>
          </HeroLogo>
          <Sticky topOffset={280}>
            {({ isSticky, style }) => {
              return (
                <HeaderNav isSticky={isSticky} style={style}>
                  {isSticky && <StickyLogo>
                    <LogoLink to='/'>
                      <img src={logo} alt='Legislated' height='40' width='40' />
                    </LogoLink>
                    <LogoLink to='/'>
                      <span>LEGISLATED</span>
                    </LogoLink>
                  </StickyLogo>}
                  <HeaderNavCenter>
                    <NavLink to='/' exact>Home</NavLink>
                    <NavLink to='/faq' exact>FAQ</NavLink>
                    <NavLink to='/about' exact>About</NavLink>
                  </HeaderNavCenter>
                </HeaderNav>
              )
            }}
          </Sticky>
        </DesktopHeader>
        <MobileHeader>
          <div>
            <LogoLink to='/'>
              <img src={logo} alt='Legislated' height='40' width='40' />
            </LogoLink>
            <LogoLink to='/'>
              <span>LEGISLATED</span>
            </LogoLink>
          </div>
          <MobileNav />
        </MobileHeader>
      </div>
    )
  }
}

const DesktopHeader = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`

const HeroLogo = styled.div`
  height: 280;
  background-color: white;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;

  > a {
    font-size: 64px;
  }
`

const HeaderNav = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${props => props.isSticky ? 'space-between' : 'center'};
  height: 85px;
  background-color: white;
  z-index: 2;
`

const StickyLogo = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding-left: 27px;

  > *:first-child {
    margin-right: 15px;
  }

  > a {
    font-size: 32px;
  }
`

// Includes a hack to style the active links due to a specificity issue
// causing the styles not to applied. This is not ideal as its tied to
// the aria-current attribute
const HeaderNavCenter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  > a {
    flex: 0 1 auto;
    padding: 0 27px;
    text-transform: uppercase;
    border-bottom: 7px solid white;
    ${css(mixins.centerVertically)};
    text-decoration: none;
    color: ${colors.light};
    ${css(mixins.fonts.light)};

    &[aria-current="true"] {
      color: ${colors.newPrimary};
      border-bottom: 7px solid ${colors.newPrimary};  
    }
  }
`

const MobileHeader = styled.div`
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

  & :hover {
    color: ${alpha(colors.black, 0.6)};
  }
`
