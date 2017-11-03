// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { default as parseDate } from 'date-fns/parse'
import differenceInHours from 'date-fns/difference_in_hours'
import { default as dateFormat } from 'date-fns/format'
import { Actions } from './Actions'
import { Element } from './Element'
import { CopyLink } from 'shared/components'
import { stylesheet, colors, mixins } from 'shared/styles'
import type { Bill } from 'shared/types'

let Content = class Content extends Component {
  props: {
    bill: Bill
  }

  // lifecycle
  render () {
    const { bill } = this.props

    const now = new Date()
    const date = parseDate(bill.hearing.date)
    const hoursLeft = differenceInHours(date, now)
    const formattedDate = dateFormat(date, 'M/D/YY h:mm A')

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
            <span>{formattedDate}</span>
            {hoursLeft < 24 && hoursLeft > 0 && <span {...rules.hoursLeft}>
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
