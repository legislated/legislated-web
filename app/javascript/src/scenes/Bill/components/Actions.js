// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Button } from '@/components'
import type { Bill } from '@/types'

type Props = {
  bill: Bill
}

let Actions = function Actions ({ bill }: Props) {
  return (
    <div>
      <div>
        <Button
          to={bill.witnessSlipUrl}
          children='Take Action'
        />
        <Button
          to={bill.witnessSlipResultUrl}
          isSecondary
          children='View Results'
        />
      </div>
      <div>
        <Button
          to={bill.detailsUrl}
          isSecondary
          children='View Details'
        />
        <Button
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

export { Actions }
