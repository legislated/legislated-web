// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import styled, { css } from 'react-emotion'
import { segmentsFromBill } from '@/functions'
import { mixins, colors } from '@/styles'
import type { Bill } from '@/types'

type Props = {
  bill: Bill
}

function getKey ({ id }: Bill, index: number) {
  return `${id}-status-segment-${index}`
}

let BillStatus = function BillStatus ({ bill }: Props) {
  return (
    <Status>
      <Line isActive />
      {segmentsFromBill(bill).map(({ name, isLine, ...props }, i) => (
        isLine
          ? <Line key={getKey(bill, i)} {...props} />
          : <Name key={getKey(bill, i)} {...props}>{name}</Name>
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

const cap = css`
  width: 10px;
  height: 10px;
  background-color: ${colors.gray6};
  border-radius: 50%;
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
      ${cap};
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
    }
  }
`)

export { BillStatus }
