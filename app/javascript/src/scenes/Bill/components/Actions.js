// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Button } from '@/components'
import { stylesheet, mixins } from '@/styles'
import type { Bill } from '@/types'

type Props = {
  bill: Bill
}

let Actions = function Actions ({ bill }: Props) {
  return (
    <div {...rules.actions}>
      <div>
        <Button
          styles={rules.button}
          to={bill.witnessSlipUrl}
          children='Take Action'
        />
        <Button
          styles={rules.button}
          to={bill.witnessSlipResultUrl}
          isSecondary
          children='View Results'
        />
      </div>
      <div>
        <Button
          styles={rules.button}
          to={bill.detailsUrl}
          isSecondary
          children='View Details'
        />
        <Button
          styles={rules.button}
          to={bill.fullTextUrl}
          isSecondary
          children='View Full Text'
        />
      </div>
    </div>
  )
}

Actions = createFragmentContainer(Actions, graphql`
  fragment Actions_bill on Bill {
    detailsUrl
    fullTextUrl
    witnessSlipUrl
    witnessSlipResultUrl
  }
`)

const rules = stylesheet({
  actions: {
    display: 'flex',
    '> div': {
      display: 'flex'
    },
    '> div + div': {
      marginLeft: 10
    },
    ...mixins.mobile.glam({
      flexDirection: 'column',
      '> div + div': {
        marginLeft: 0,
        marginTop: 10
      }
    })
  },
  button: {
    marginRight: 10,
    ':last-child': {
      marginRight: 0
    },
    ...mixins.mobile.glam({
      flex: 1,
      overflow: 'hidden',
      ':last-child': {
        marginRight: 0
      },
      '> span:last-child': {
        direction: 'rtl',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    })
  }
})

export { Actions }
