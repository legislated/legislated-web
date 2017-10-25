/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Actions } from '../Actions'

// subject
let subject
let bill

function loadSubject () {
  subject = shallow(<Actions bill={bill} />).dive()
}

const element = {
  slipLink: () => subject.find('Button').at(0),
  slipResultLink: () => subject.find('Button').at(1),
  detailsLink: () => subject.find('Button').at(2),
  textLink: () => subject.find('Button').at(3)
}

// specs
beforeEach(() => {
  // TODO: build rosie.js factories
  bill = {
    witnessSlipUrl: 'http://www.test.com/slip',
    witnessSlipResultUrl: 'http://www.test.com/result',
    billDetailsUrl: 'http://www.test.com/details',
    fullTextUrl: 'http://www.test.com/text'
  }
})

afterEach(() => {
  subject = null
})

describe('#render', () => {
  beforeEach(loadSubject)

  it('shows the witness slip link', () => {
    expect(element.slipLink()).toHaveProp('to', bill.witnessSlipUrl)
  })

  it('shows the witness slip result link', () => {
    expect(element.slipResultLink()).toHaveProp('to', bill.witnessSlipResultUrl)
  })

  it('shows the details link', () => {
    expect(element.detailsLink()).toHaveProp('to', bill.detailsUrl)
  })

  it('shows the full text link', () => {
    expect(element.textLink()).toHaveProp('to', bill.fullTextUrl)
  })
})

describe('the relay container', () => {
  it('has a bill', () => {
    expect(Actions.container.fragment).toBeTruthy()
  })
})
