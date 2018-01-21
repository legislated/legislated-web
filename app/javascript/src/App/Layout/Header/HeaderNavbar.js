// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Logo } from '../Logo'
import { LogoLink } from '../LogoLink'
import { NavLinks as NavLinks$ } from '../NavLinks'
import { TranslateAndFade } from '@/components'
import { mixins, colors } from '@/styles'

type Props = {
  isSticky: boolean,
  disablesAnimation: boolean,
  navbarRef?: (Object) => void
}

export function HeaderNavbar ({
  isSticky,
  disablesAnimation,
  navbarRef
}: Props) {
  return (
    <Navbar>
      <StickyBar
        ref={navbarRef}
        style={isSticky ? { position: 'fixed', top: '0px' } : {}}
      >
        <TranslateAndFade
          component={StickyLogo}
          disable={disablesAnimation}
          direction='down'
        >
          {isSticky && (
            <div>
              <LogoLink to='/'>
                <Logo width={40} height={34} />
                <h2>Legislated</h2>
              </LogoLink>
            </div>
          )}
        </TranslateAndFade>
        <NavLinks />
      </StickyBar>
    </Navbar>
  )
}

const height = 70
const Navbar = styled.div`
  position: relative;
  height: ${height}px;
  width: 100%;

  ${mixins.mobile`
    display: none;
  `}
`

const StickyBar = styled.div`
  ${mixins.flexRow};

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${height}px;
  padding: 0 25px;
  z-index: 1;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray4};

  &:after {
    content: '';
    flex: 1;
  }
`

const StickyLogo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const NavLinks = styled(NavLinks$)`
  margin: 0 25px;
`
