/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Content } from '../Content'
import { now, addHours } from 'shared/date'

jest.mock('shared/date', () => {
  const actual = require.requireActual('shared/date')
  const date = new Date(2017, 2, 14, 5, 30, 35, 500)

  return {
    ...actual,
    now: jest.fn(() => date)
  }
})

// subject
let subject
let bill

function loadSubject () {
  subject = shallow(<Content bill={bill} />).dive().dive()
}

// specs
beforeEach(() => {
  // TODO: build rosie.js factories
  bill = {
    documentNumber: 'HB1234',
    title: 'Foo',
    summary: 'A bill, fantastic',
    hearing: {
      date: addHours(now(), 11.9)
    },
    committee: {
      name: 'Many Pointed Bills'
    }
  }
})

afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('does not show the hours left when over 23 hours away', () => {
    bill.hearing.date = addHours(now(), 24.1)
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(Content.container.fragment).toBeTruthy()
  })
})
