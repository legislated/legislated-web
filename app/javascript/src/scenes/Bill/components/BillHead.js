// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import {Helmet} from 'react-helmet'
import type { Bill } from '@/types'

type Props = {
  bill: Bill
}

function formatTitle (bill:Bill) {
  return `${bill.documentNumber}: ${bill.title}`
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
    documentNumber
    title
    summary
  }
`)

export { BillHead }
