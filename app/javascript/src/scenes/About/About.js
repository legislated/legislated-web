// @flow
import * as React from 'react'
import { Link } from '@/components'

export function About () {
  return (
    <div>
      <div>
        <h1>About Us</h1>
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
      </div>
    </div>
  )
}
