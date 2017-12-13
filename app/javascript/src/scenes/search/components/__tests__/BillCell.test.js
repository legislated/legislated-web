/* eslint-env jest */
import { assign } from 'lodash'
import React from 'react'
import { shallow } from 'enzyme'
import { BillCell } from '../BillCell'

// subject
let subject
let bill

function loadSubject () {
  subject = shallow(<BillCell bill={bill} />).dive()
}

// specs
beforeEach(() => {
  subject = null
})

describe('#render', () => {
  beforeEach(() => {
    bill = {
      id: '1234',
      documentNumber: 'HB1234',
      title: 'Foo',
      summary: 'A bill, fantastic',
      witnessSlipUrl: 'http://www.test.com/slip',
      detailsUrl: 'http://www.test.com/details',
      fullTextUrl: 'http://www.test.com/text',
      hearing: {
        date: '2010-01-01T00:00:00-06:00'
      }
    }
  })

  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('hides the summary when missing', () => {
    assign(bill, { summary: '' })
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(BillCell.container).toBeTruthy()
  })
})
