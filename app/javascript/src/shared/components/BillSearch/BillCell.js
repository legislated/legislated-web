// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import { createFragmentContainer, graphql } from 'react-relay'
import { format } from 'date-fns'
import type { Bill } from '@/types'
import { Button } from '@/components'
import { colors, mixins } from '@/styles'

type Props = {
  bill: Bill,
  className?: string
}

let BillCell = function BillCell ({
  bill
}: Props) {
  return (
    <Cell>
      <Subtitle>
        <Icon src={null} alt='Bill Icon' />
        <p>{bill.documentNumber} - Updated {format(bill.updatedAt, 'DD/MM/YYYY')}</p>
      </Subtitle>
      <h3>{bill.title}</h3>
      <Status />
      <p>{bill.summary}</p>
      <Button
        isSmall
        to={`/bill/${bill.id}`}
        children='More Info'
      />
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
  }
`)

const spacing = css`
  margin-bottom: 15px;
`

const Cell = styled.div`
  ${mixins.flexColumn};
  align-items: flex-start;

  > h3, > p {
    ${spacing};
  }
`

const Subtitle = styled.div`
  ${mixins.flexRow};

  align-items: flex-end;
  margin-bottom: 12px;
  color: ${colors.secondary};
`

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background-color: ${colors.secondary};
`

const Status = styled.div`
  ${spacing};

  align-self: stretch;
  max-width: 830px;
  height: 13px;
  background-color: ${colors.gray4};
`

export { BillCell }
