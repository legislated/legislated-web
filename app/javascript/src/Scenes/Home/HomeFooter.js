// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Footer } from '@/components'
import { mixins, colors } from '@/styles'
import { quill } from '&/images'

const size = {
  width: 77,
  height: 25
}

export function HomeFooter () {
  return (
    <Footer>
      <Background>
        <Content>
          <img
            src={quill}
            alt='Quill Logo'
            style={size}
            {...size}
          />
          <h3>Non-partisan, educational, accessible</h3>
          <p>Legislated is a non-profit organization started at Chi Hack Night by a dedicated group of volunteers.</p>
        </Content>
      </Background>
    </Footer>
  )
}

const Background = styled.div`
  ${mixins.flexRow};
  ${mixins.flexCenter};

  padding: 50px 25px;
  background-color: ${colors.secondary};
`

const Content = styled.div`
  ${mixins.flexColumn};

  align-items: center;
  max-width: 550px;
  color: ${colors.white};
  text-align: center;

  > * + * {
    margin-top: 15px;
  }
`
