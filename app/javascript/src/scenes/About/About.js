// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from '@/components'
import { mixins, colors } from '@/styles'

export function About () {
  return (
    <Scene>
      <h3>About Us</h3>
      <p>
        Legislated has been developed by a
        {' '}<Link to='https://chihacknight.org'>Chi Hack Night</Link>{' '}
        breakout group to make it easier for Illinois residents
        to take advantage of the Witness Slip functionality provided by
        the State of Illinois.
      </p>
      <p>
        We are a group of volunteers who want to make civic engagement
        at the state level more user-friendly. We try to make it easy for
        Illinois residents to voice their opinions on proposed legislation
        via witness slips.
      </p>
      <p>
        For more information please checkout
        {' '}<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link>{' '}
        on Facebook or
        {' '}<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link>{' '}
        on Twitter. Questions? Please ask!
      </p>
      <p>
        To get involved,
        {' '}<Link to='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097'>register here</Link>{' '}
        to attend a Chi Hack Night meeting or join our
        {' '}<Link to='https://www.facebook.com/groups/248218992302984/'>Facebook Working Group</Link>.
      </p>
    </Scene>
  )
}

const Scene = styled.section`
  ${mixins.flexColumn};
  ${mixins.pageContent};

  align-self: center;
  margin-top: 30px;
  margin-bottom: 30px;

  h3 {
    margin-bottom: 30px;
  }

  * + p {
    margin-top: 10px;
  }
`
