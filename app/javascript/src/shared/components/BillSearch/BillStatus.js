// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import styled, { css } from 'react-emotion'
import { mixins, colors } from '@/styles'
import type { Bill } from '@/types'

type Props = {
  bill: Bill
}

function segmentsFromBill ({ steps }: Bill) {
  return [
    { name: 'House', isActive: true },
    { name: 'Senate' },
    { name: 'Governor' },
    { name: 'Law' }
  ]
}

let BillStatus = function BillStatus ({ bill }: Props) {
  return (
    <Status>
      {segmentsFromBill(bill).map(({ name, ...props }, index, segments) => (
        <React.Fragment key={`${bill.id}-status-segment-${index}`}>
          <Line {...props} />
          {index !== segments.length - 1 && <Name {...props}>{name}</Name>}
        </React.Fragment>
      ))}
    </Status>
  )
}

const Status = styled.div`
  ${mixins.flexRow};

  align-items: center;
  align-self: stretch;
  max-width: 830px;
  height: 13px;
  margin-bottom: 15px;
`

const active = css`
  background-color: ${colors.secondary};

  &:first-child, &:last-child {
    &:before {
      background-color: ${colors.secondary};
    }
  }
`

const Line = styled.div`
  ${mixins.flexRow};

  flex: 2;
  align-items: center;
  height: 2px;
  background-color: ${colors.gray6};

  &:last-child {
    justify-content: flex-end;
  }

  &:first-child, &:last-child {
    flex: 1;

    &:before {
      content: '';
      width: 10px;
      height: 10px;
      background-color: ${colors.gray6};
      border-radius: 50%;
    }
  }

  ${({ isActive }) => isActive && active}
`

const Name = styled.span`
  margin: 0 10px;
  color: ${({ isActive }) => isActive ? colors.primary : colors.gray5};
  font-size: 12px;
  text-transform: uppercase;
`

BillStatus = createFragmentContainer(BillStatus, graphql`
  fragment BillStatus_bill on Bill {
    id
    steps {
      actor
      action
      resolution
      date
    }
  }
`)

export { BillStatus }
