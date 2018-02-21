// @flow
import { last, range } from 'lodash'
import type { Bill, Step, StepActor } from '@/types'

const { floor } = Math

const SEGMENTS_LENGTH = 6
const SEGMENTS_LEAD = 0
const SEGMENTS_FOLLOW = 1

type Segment = {
  name: string,
  isLine: boolean,
  isActive: boolean
}

export function segmentsFromBill ({ steps }: Bill) {
  return segmentsFromSteps(findLastSequence(steps.filter(hasPrimaryActor)))
}

// segments
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

function initSegment (step: Step): Segment {
  return {
    name: getSegmentName(step.actor),
    isLine: step.action === 'RESOLVED',
    isActive: true
  }
}

function stubSegment (lead: StepActor, index: number) {
  return {
    name: getSegmentName(stubActor(lead, index)),
    isLine: index % 2 === 1,
    isActive: false
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

// sequence filtering
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
    const other = chunk && last(chunk)

    if (other == null || step.actor !== other.actor) {
      chunks.push([step])
    } else if (step.action !== other.action) {
      // we need to ignore duplicate actions for now, but this should
      // probably be done on the backend
      chunk.push(step)
    }

    return chunks
  }, [])
}
