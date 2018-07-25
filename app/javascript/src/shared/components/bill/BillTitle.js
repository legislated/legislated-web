// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { createFragmentContainer, graphql } from 'react-relay'
import { format } from 'date-fns'
import type { BillTitle_bill as Bill } from './__generated__/BillTitle_bill.graphql'

// @flow
import { colors, mixins } from '@/styles'

type Props = {
  bill: Bill
}

function formatSubtitle ({ number, updatedAt }: Bill) {
  return `${number} - Updated ${format(updatedAt, 'MM/DD/YYYY')}`
}

let BillTitle = function BillTitle ({ bill }: Props) {
  return (
    <React.Fragment>
      <Subtitle>{formatSubtitle(bill)}</Subtitle>
      <Title>{bill.title}</Title>
    </React.Fragment>
  )
}

BillTitle = createFragmentContainer(BillTitle, graphql`
  fragment BillTitle_bill on Bill {
    title
    updatedAt
    number
  }
`)

const Subtitle = styled.h6`
  ${mixins.font.regular};

  margin-bottom: 12px;
  color: ${colors.secondary};
`

const Title = styled.h3`
  margin-bottom: 15px;
`

export { BillTitle }
