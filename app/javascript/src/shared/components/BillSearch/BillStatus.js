// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import styled, { css } from 'react-emotion'
import { mixins, colors } from '@/styles'
import type { Bill, Step } from '@/types'

const SEGMENT_HOUSE = 'House'
const SEGMENT_SENATE = 'Senate'
const SEGMENT_GOVERNOR = 'Governor'

type Props = {
  bill: Bill
}

type Segment = {
  name: string,
  isLine: boolean,
  isActive: boolean
}

function nameFromActor (actor) {
  switch (actor) {
    case 'LOWER':
    case 'LOWER_COMMITTEE':
      return SEGMENT_HOUSE
    case 'UPPER':
    case 'UPPER_COMMITTEE':
      return SEGMENT_SENATE
    default: // 'GOVERNOR'
      return SEGMENT_GOVERNOR
  }
}

function segmentFromStep ({ actor, action }: Step): Segment {
  return {
    name: nameFromActor(actor),
    isLine: action === 'INTRODUCED',
    isActive: true
  }
}

function segmentsRemovingRepetition (segments: Segment[]) {
  if (segments.length) {
    return []
  }

  const [ first, ...rest ] = segments
  const { name } = first

  // find start index
  const index = rest.reduce((memo, segment, i) => {
    if (segment.name !== name) {
      return memo
    }

    const previous = segments[i - 1]
    if (previous.name === name) {
      return memo
    }

    return i
  }, 0)

  return []
}

function segmentsFromBill ({ steps }: Bill) {
  const segments = steps.map((step) => segmentFromStep)
  return segmentsRemovingRepetition(segments)
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
      resolution
      date
    }
  }
`)

export { BillStatus }
