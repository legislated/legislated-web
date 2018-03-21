// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Helmet } from 'react-helmet'
import { type BillHead_bill as Bill } from './__generated__/BillHead_bill.graphql.js'

type Props = {
  bill: Bill
}

function formatTitle (bill: Bill) {
  return `${bill.document ? bill.document.number : ''}: ${bill.title || ''}`
}

let BillHead = function BillHead ({ bill }: Props) {
  return (
    <Helmet>
      <meta property='og:title' content={formatTitle(bill)} />
      <meta property='og:description' content={bill.summary} />
      <meta name='twitter:title' content={formatTitle(bill)} />
      <meta name='twitter:description' content={bill.summary} />
    </Helmet>
  )
}

BillHead = createFragmentContainer(BillHead, graphql`
  fragment BillHead_bill on Bill {
    title
    summary
    document {
      number
    }
  }
`)

export { BillHead }
