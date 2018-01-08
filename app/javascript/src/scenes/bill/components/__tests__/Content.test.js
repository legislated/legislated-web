/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { Content } from '../Content'
import { now, addHours } from 'shared/date'

jest.mock('shared/date', () => {
  const actual = require.requireActual('shared/date')
  const date = new Date(2017, 2, 14, 5, 0, 0, 0)

  return {
    ...actual,
    now: () => date
  }
})

// subject
let subject

const defaults = {
  bill: {
    documentNumber: 'HB1234',
    title: 'Foo',
    summary: 'A bill, fantastic',
    hearing: {
      date: addHours(now(), 11.9)
    },
    committee: {
      name: 'Many Pointed Bills'
    }
  },
  location: {
    pathname: '/test-path'
  }
}

function loadSubject (props = {}) {
  subject = shallow(<Content {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('does not show the hours left when over 23 hours away', () => {
    loadSubject({
      bill: {
        hearing: { date: addHours(now(), 24.1) }
      }
    })

    expect(subject).toMatchSnapshot()
  })
})
