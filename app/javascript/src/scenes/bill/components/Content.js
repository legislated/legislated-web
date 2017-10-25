// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import moment from 'moment'
import { Actions } from './Actions'
import { Element } from './Element'
import { CopyLink } from 'shared/components'
import { stylesheet, colors, mixins } from 'shared/styles'
import type { Bill } from 'shared/types'

const { floor } = Math

let Content = class Content extends Component {
  props: {
    bill: Bill
  }

  // lifecycle
  render () {
    const { bill } = this.props

    const now = moment()
    const date = moment(bill.hearing.date)
    const hoursLeft = floor(date.diff(now, 'hours', true))

    return <div>
      <div {...rules.header}>
        <section>
          <h1>{bill.title}</h1>
          <h4>{bill.documentNumber}</h4>
        </section>
        <section>
          <CopyLink value={document.location.href} />
        </section>
      </div>
      <div {...rules.body}>
        <div {...rules.column}>
          <Element label='State Synopsis'>{bill.summary}</Element>
        </div>
        <div {...rules.column}>
          <Element label='Hearing Date'>
            <span>{date.calendar()}</span>
            {hoursLeft < 24 && <span {...rules.hoursLeft}>
              {`(${hoursLeft} hours left)`}
            </span>}
          </Element>
          <Element label='Committee'>{bill.committee.name}</Element>
        </div>
      </div>
      <Actions bill={bill} />
    </div>
  }
}

Content = createFragmentContainer(Content, graphql`
  fragment Content_bill on Bill {
    documentNumber
    title
    summary
    sponsorName
    hearing {
      date
    }
    committee {
      name
    }
    chamber {
      name
    }
    ...Actions_bill
  }
`)

const rules = stylesheet({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15,
    '> section': {
      display: 'flex',
      flexDirection: 'column'
    },
    ...mixins.mobile({
      flexDirection: 'column',
      '> section:first-child': {
        marginBottom: 10
      },
      '> h1': {
        marginBottom: 5
      }
    })
  },
  body: {
    ...mixins.borders.low(['bottom']),
    display: 'flex',
    flexBasis: 0,
    paddingBottom: 15,
    marginBottom: 15,
    ...mixins.mobile({
      flexDirection: 'column'
    })
  },
  column: {
    flex: 1,
    ':not(:last-of-type)': {
      marginRight: 15
    },
    '> *:not(:last-child)': {
      marginBottom: 10
    },
    ...mixins.mobile({
      marginBottom: 15,
      ':last-child': {
        marginBottom: 0
      }
    })
  },
  hoursLeft: {
    marginLeft: 5,
    color: colors.secondary
  }
})

export { Content }
