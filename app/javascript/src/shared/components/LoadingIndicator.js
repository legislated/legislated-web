// @flow
import * as React from 'react'
import styled, { css, keyframes } from 'react-emotion'
import { TranslateAndFade } from '@/components'
import { colors } from '@/styles'

type Props = {
  isLoading: boolean
}

export function LoadingIndicator ({ isLoading }: Props) {
  return (
    <TranslateAndFade disableAppear>
      {isLoading && (
        <Indicator key='indicator'>
          <TopBar />
          <BottomBar />
        </Indicator>
      )}
    </TranslateAndFade>
  )
}

const bar = css`
  height: 22px;
  border-radius: 3px;
  background-color: ${colors.secondary};
`

const bounce = (start: number, end: number) => keyframes`
  0% {
    width: ${start}%;
  }

  100% {
    width: ${end}%;
  }
`

const Indicator = styled.div`
  border: 1px solid ${colors.secondary};
  padding: 15px;
  margin-bottom: 40px;
  border-radius: 10px;
  background-color: ${colors.white};
`

const TopBar = styled.div`
  ${bar};
  margin-bottom: 5px;
  animation: ${bounce(10, 13)} 1.5s alternate infinite;
`

const BottomBar = styled.div`
  ${bar};
  animation: ${bounce(8, 15)} 1.2s alternate infinite;
`
