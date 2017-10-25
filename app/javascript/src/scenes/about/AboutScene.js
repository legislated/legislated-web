// @flow
import React, { Component } from 'react'
import { Link } from 'shared/components'
import { stylesheet, colors, mixins } from 'shared/styles'

export class AboutScene extends Component {
  render () {
    return <div {...rules.container}>
      <div {...rules.content}>
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
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    ...mixins.shadows.low(),
    ...mixins.borders.low(),
    padding: 15,
    backgroundColor: colors.neutral,
    '> h1': {
      ...mixins.borders.low(['bottom']),
      marginBottom: 15,
      paddingBottom: 15
    },
    '> p:not(:last-child)': {
      marginBottom: 10
    }
  }
})
