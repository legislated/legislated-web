/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { BillStatus } from '../BillStatus'

// subject
let subject

const defaults = {
  bill: {
    id: 'test-id',
    steps: [
      { actor: 'LOWER', action: 'INTRODUCED' },
      { actor: 'LOWER_COMMITTEE', action: 'INTRODUCED' },
      { actor: 'LOWER_COMMITTEE', action: 'RESOLVED' },
      { actor: 'LOWER', action: 'RESOLVED' },
      { actor: 'LOWER', action: 'RESOLVED' },
      { actor: 'UPPER', action: 'INTRODUCED' },
      { actor: 'UPPER_COMMITTEE', action: 'INTRODUCED' }
    ]
  }
}

function loadSubject (props = {}) {
  subject = shallow(<BillStatus {...defaultsDeep(props, defaults)} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the status', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('removes obsolete steps', () => {
    loadSubject({
      bill: {
        steps: [
          ...defaults.bill.steps,
          { actor: 'UPPER_COMMITTEE', action: 'RESOLVED' },
          { actor: 'UPPER', action: 'RESOLVED' },
          { actor: 'LOWER', action: 'INTRODUCED' }
        ]
      }
    })

    expect(subject).toMatchSnapshot()
  })
})
