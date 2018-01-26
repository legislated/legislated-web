// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { last, range } from 'lodash'
import styled, { css } from 'react-emotion'
import { mixins, colors } from '@/styles'
import type { Bill, Step, StepActor } from '@/types'

const { floor } = Math

const SEGMENTS_LENGTH = 6
const SEGMENTS_LEAD = 0
const SEGMENTS_FOLLOW = 1

type Props = {
  bill: Bill
}

type Segment = {
  name: string,
  isLine: boolean,
  isActive: boolean
}

function hasPrimaryActor ({ actor }: Step) {
  switch (actor) {
    case 'LOWER':
    case 'UPPER':
    case 'GOVERNOR':
      return true
    default:
      return false
  }
}

function getLeadActor (steps: Step[]): ?StepActor {
  return steps.length > 0 ? steps[0].actor : null
}

function isOrderedByActor (prev: Step, next: Step) {
  return prev.actor !== next.actor && prev.actor !== 'GOVERNOR'
}

function chunkByActor (steps: Step[]): Step[][] {
  return steps.reduce((chunks, step) => {
    const chunk = last(chunks)
    const other = chunk && chunk[0]

    if (other == null || step.actor !== other.actor) {
      chunks.push([step])
    } else {
      chunk.push(step)
    }

    return chunks
  }, [])
}

function findLastSequence (steps: Step[]) {
  const lead = getLeadActor(steps)
  if (lead == null) {
    return []
  }

  const actors = {}
  return chunkByActor(steps).reduceRight((sequence, chunk) => {
    const next = sequence[0]
    const prev = chunk[0]

    if (next == null || (!actors[lead] && !actors[prev.actor] && isOrderedByActor(prev, next))) {
      actors[prev.actor] = true
      return [...chunk, ...sequence]
    }

    return sequence
  }, [])
}

function getSegmentName (actor: StepActor) {
  switch (actor) {
    case 'LOWER':
      return 'House'
    case 'UPPER':
      return 'Senate'
    default: // 'GOVERNOR'
      return 'Governor'
  }
}

function initSegment (step: Step): Segment {
  return {
    name: getSegmentName(step.actor),
    isLine: step.action === 'RESOLVED',
    isActive: true
  }
}

function stubActor (lead: StepActor, index: number) {
  const slice = floor(index / 2)

  switch (slice) {
    case SEGMENTS_LEAD:
      return lead
    case SEGMENTS_FOLLOW:
      return lead === 'LOWER' ? 'UPPER' : 'LOWER'
    default:
      return 'GOVERNOR'
  }
}

function stubSegment (lead: StepActor, index: number) {
  return {
    name: getSegmentName(stubActor(lead, index)),
    isLine: index % 2 === 1,
    isActive: false
  }
}

function segmentsFromSteps (steps: Step[]): Segment[] {
  const lead = getLeadActor(steps) || 'LOWER'

  return range(0, SEGMENTS_LENGTH).map((i) => {
    const step = steps[i]
    if (step != null) {
      return initSegment(step)
    } else {
      return stubSegment(lead, i)
    }
  })
}

function segmentsFromBill ({ steps }: Bill) {
  return segmentsFromSteps(findLastSequence(steps.filter(hasPrimaryActor)))
}

let BillStatus = function BillStatus ({ bill }: Props) {
  return (
    <Status>
      <Line isActive />
      {segmentsFromBill(bill).map(({ name, isLine, ...props }, index) => (
        <React.Fragment key={`${bill.id}-status-segment-${index}`}>
          {isLine
            ? <Line {...props} />
            : <Name {...props}>{name}</Name>}
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
