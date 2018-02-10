// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { format, parse, differenceInHours } from 'date-fns'
import { Actions } from './Actions'
import { Element } from './Element'
import { CopyLink } from '@/components'
import { now } from '@/functions'
import { colors, mixins } from '@/styles'
import type { Bill } from '@/types'

type Props = {
  bill: Bill
} & ContextRouter

let Content = function Content ({ bill, location }: Props) {
  const date = parse(bill.hearing.date)
  const hoursLeft = differenceInHours(date, now())
  const formattedDate = format(date, 'M/D/YY h:mm A')

  return (
    <div>
      <div>
        <section>
          <h1>{bill.title}</h1>
          <h4>{bill.documentNumber}</h4>
        </section>
        <section>
          <CopyLink value={location.pathname} />
        </section>
      </div>
      <div>
        <div>
          <Element label='State Synopsis'>{bill.summary}</Element>
        </div>
        <div>
          <Element label='Hearing Date'>
            <span>{formattedDate}</span>
            {hoursLeft < 24 && hoursLeft > 0 && <span>
              {`(${hoursLeft} hours left)`}
            </span>}
          </Element>
          <Element label='Committee'>{bill.committee.name}</Element>
        </div>
      </div>
      <Actions bill={bill} />
    </div>
  )
}

Content = createFragmentContainer(withRouter(Content), graphql`
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

export { Content }
