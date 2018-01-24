// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { createFragmentContainer, graphql } from 'react-relay'
import { format } from 'date-fns'
import { BillStatus } from './BillStatus'
import type { Bill } from '@/types'
import { Button } from '@/components'
import { colors, mixins } from '@/styles'

type Props = {
  bill: Bill,
  className?: string
}

function formatSubtitle ({ documentNumber, updatedAt }: Bill) {
  return `${documentNumber} - Updated ${format(updatedAt, 'DD/MM/YYYY')}`
}

let BillCell = function BillCell ({
  bill
}: Props) {
  return (
    <Cell>
      <Subtitle>{formatSubtitle(bill)}</Subtitle>
      <h3>{bill.title}</h3>
      <BillStatus bill={bill} />
      <p>{bill.summary}</p>
      <Button to={`/bill/${bill.id}`} isSmall children='More Info' />
    </Cell>
  )
}

BillCell = createFragmentContainer(BillCell, graphql`
  fragment BillCell_bill on Bill {
    id
    documentNumber
    title
    summary
    updatedAt
    hearing {
      date
    }
    ...BillStatus_bill
  }
`)

const Cell = styled.div`
  ${mixins.flexColumn};

  align-items: flex-start;
  max-width: 960px;

  > h3, > p {
    margin-bottom: 15px;
  }
`

const Subtitle = styled.p`
  margin-bottom: 12px;
  color: ${colors.secondary};
`

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background-color: ${colors.secondary};
`

export { BillCell }
