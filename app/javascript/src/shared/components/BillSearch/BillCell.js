// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { css } from 'glamor'
import { formatDate } from 'shared/date'
import type { Bill } from 'shared/types'
import { Button } from 'shared/components'
import { stylesheet, colors, mixins } from 'shared/styles'

type Props = {
  bill: Bill,
  className?: string
}

let BillCell = function BillCell ({
  bill
}: Props) {
  const formattedDate = formatDate(bill.hearing.date, 'DD/MM/YYYY')

  return (
    <div {...css(rules.container)}>
      <div {...rules.info}>
        <div {...rules.header}>
          <div {...rules.document}>
            <h3>{bill.title}</h3>
            <span>{bill.documentNumber}</span>
          </div>
          <p>{formattedDate}</p>
        </div>
        {bill.summary && <p {...rules.summary}>{bill.summary}</p>}
      </div>
      <div {...rules.actions}>
        <Button
          styles={rules.button}
          to={bill.witnessSlipUrl}
          children='Take Action'
        />
        <Button
          styles={rules.button}
          to={`/bill/${bill.id}`}
          isSecondary
          children='More Info'
        />
      </div>
    </div>
  )
}

BillCell = createFragmentContainer(BillCell, graphql`
  fragment BillCell_bill on Bill {
    id
    documentNumber
    title
    summary
    witnessSlipUrl
    detailsUrl
    fullTextUrl
    hearing {
      date
    }
  }
`)

const rules = stylesheet({
  container: {
    ...mixins.shadows.low,
    ...mixins.borders.low(),
    display: 'flex',
    padding: 15,
    marginBottom: 15,
    backgroundColor: colors.neutral,
    '&:last-child': {
      marginBottom: 0
    },
    ...mixins.mobile.glam({
      flexDirection: 'column'
    })
  },
  info: {
    ...mixins.borders.low(['right']),
    flex: 1,
    paddingRight: 15,
    ...mixins.mobile.glam({
      ...mixins.borders.low(['bottom']),
      paddingRight: 0,
      paddingBottom: 15,
      marginBottom: 15,
      borderRight: 'none'
    })
  },
  header: {
    display: 'flex',
    flexDirection: 'column'
  },
  document: {
    marginBottom: 5,
    '> *': {
      display: 'inline-block'
    },
    '> h3': {
      ...mixins.fonts.bold,
      marginRight: 10
    }
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 15,
    ...mixins.mobile.glam({
      flexDirection: 'row',
      paddingLeft: 0
    })
  },
  button: {
    width: 200,
    marginBottom: 10,
    ':last-child': {
      marginBottom: 0
    },
    ...mixins.mobile.glam({
      flex: 1,
      width: 'auto',
      marginBottom: 0,
      marginRight: 10,
      ':last-child': {
        marginRight: 0
      }
    })
  },
  summary: {
    ...mixins.borders.low(['top']),
    marginTop: 10,
    paddingTop: 10
  }
})

export { BillCell }
