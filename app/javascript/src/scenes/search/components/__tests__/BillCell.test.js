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

const element = {
  doc: () => subject.find('span'),
  title: () => subject.find('h3'),
  date: () => subject.find('p').at(0),
  summary: () => subject.find('p').at(1),
  slipLink: () => subject.find('Button').at(0),
  detailsLink: () => subject.find('Button').at(1)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  beforeEach(() => {
    // TODO: add rosie.js factories
    bill = {
      documentNumber: 'HB1234',
      title: 'Foo',
      summary: 'A bill, fantastic',
      witnessSlipUrl: 'http://www.test.com/slip',
      billDetailsUrl: 'http://www.test.com/details',
      fullTextUrl: 'http://www.test.com/text',
      hearing: {
        date: '2010-01-01T00:00:00-06:00'
      }
    }
  })

  describe('normally', () => {
    beforeEach(loadSubject)

    it('shows the document number', () => {
      expect(element.doc()).toHaveText(bill.documentNumber)
    })

    it('shows the title', () => {
      expect(element.title()).toHaveText(bill.title)
    })

    it('shows the hearing date', () => {
      expect(element.date()).toHaveText('01/01/2010')
    })

    it('shows the summary', () => {
      expect(element.summary()).toHaveText(bill.summary)
    })

    it('shows the slip link', () => {
      expect(element.slipLink()).toHaveProp('to', bill.witnessSlipUrl)
    })

    it('shows the details page link', () => {
      expect(element.detailsLink()).toHaveProp('to', bill.detailsUrl)
    })
  })

  describe('when data is missing', () => {
    beforeEach(() => {
      assign(bill, {
        summary: ''
      })
    })

    it('hides the summary', () => {
      loadSubject()
      expect(element.summary().get(0)).toBeFalsy()
    })
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(BillCell.container).toBeTruthy()
  })
})
