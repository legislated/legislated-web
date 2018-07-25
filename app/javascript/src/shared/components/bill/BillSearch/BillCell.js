// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { createFragmentContainer, graphql } from 'react-relay'
import { BillTitle } from '../BillTitle'
import { BillStatus } from '../BillStatus'
import { Button } from '@/components'
import { mixins } from '@/styles'
import type { Bill } from '@/types'

type Props = {
  bill: Bill,
  className?: string
}

let BillCell = function BillCell ({
  bill
}: Props) {
  return (
    <div>
      <Cell>
        <BillTitle bill={bill} />
        <BillStatus bill={bill} />
        <p>{bill.summary}</p>
        <Button to={`/bill/${bill.id}`} isSmall children='More Info' />
      </Cell>
    </div>
  )
}

BillCell = createFragmentContainer(BillCell, graphql`
  fragment BillCell_bill on Bill {
    id
    summary
    hearing {
      date
    }
    ...BillTitle_bill
    ...BillStatus_bill
  }
`)

const Cell = styled.div`
  ${mixins.flexColumn};

  align-items: flex-start;
  max-width: 960px;

  > p {
    margin-bottom: 15px;
  }
`

export { BillCell }
