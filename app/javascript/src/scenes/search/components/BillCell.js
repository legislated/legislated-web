// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import moment from 'moment'
import { css } from 'glamor'
import type { Rule } from 'glamor'
import type { Bill } from 'shared/types'
import { Button } from 'shared/components'
import { stylesheet, colors, mixins } from 'shared/styles'

let BillCell = class BillCell extends Component {
  props: {
    bill: Bill,
    styles?: Rule
  }

  // lifecycle
  render () {
    const { bill, styles } = this.props
    const date = moment(bill.hearing.date)

    return <div {...css(rules.container, styles)}>
      <div {...rules.info}>
        <div {...rules.header}>
          <div {...rules.document}>
            <h3>{bill.title}</h3>
            <span>{bill.documentNumber}</span>
          </div>
          <p>{date.calendar()}</p>
        </div>
        {bill.summary && <p {...rules.summary}>{bill.summary}</p>}
      </div>
      <div {...rules.actions}>
        <Button
          type='solid'
          styles={rules.button}
          to={bill.witnessSlipUrl}
          label='Take Action'
          iconName='pencil-square-o'
        />
        <Button
          styles={rules.button}
          to={`bill/${bill.id}`}
          label='More Info'
          iconName='file-text-o'
        />
      </div>
    </div>
  }
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
    ...mixins.shadows.low(),
    ...mixins.borders.low(),
    display: 'flex',
    padding: 15,
    marginBottom: 15,
    backgroundColor: colors.neutral,
    '&:last-child': {
      marginBottom: 0
    },
    ...mixins.mobile({
      flexDirection: 'column'
    })
  },
  info: {
    ...mixins.borders.low(['right']),
    flex: 1,
    paddingRight: 15,
    ...mixins.mobile({
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
    ...mixins.mobile({
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
    ...mixins.mobile({
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
