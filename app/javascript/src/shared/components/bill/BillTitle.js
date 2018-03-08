// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { createFragmentContainer, graphql } from 'react-relay'
import { format } from 'date-fns'
import type { Bill } from '@/types'

// @flow
import { colors, mixins } from '@/styles'

type Props = {
  bill: Bill
}

function formatSubtitle ({ documentNumber, updatedAt }: Bill) {
  return `${documentNumber} - Updated ${format(updatedAt, 'DD/MM/YYYY')}`
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
    document {
      number
    }
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
