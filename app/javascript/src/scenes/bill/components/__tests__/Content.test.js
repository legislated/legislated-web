/* eslint-env jest */
import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { Content } from '../Content'

// subject
let subject
let bill

function loadSubject () {
  subject = shallow(<Content bill={bill} />).dive()
}

const element = {
  title: () => subject.find('h1'),
  number: () => subject.find('h4'),
  summary: () => subject.find('Element').at(0),
  date: () => subject.find('Element span').at(0),
  actions: () => subject.find('Actions'),
  hoursLeft: () => subject.find('Element span').at(1),
  committee: () => subject.find('Element').at(2)
}

// specs
beforeEach(() => {
  // TODO: build rosie.js factories
  bill = {
    documentNumber: 'HB1234',
    title: 'Foo',
    summary: 'A bill, fantastic',
    hearing: {
      date: moment().add(11.9, 'hours').utc()
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
  describe('normally', () => {
    beforeEach(loadSubject)

    it('shows the title', () => {
      expect(element.title()).toHaveText(bill.title)
    })

    it('shows the document number', () => {
      expect(element.number()).toHaveText(bill.documentNumber)
    })

    it('shows the summary', () => {
      expect(element.summary()).toHaveProp('children', bill.summary)
    })

    it('shows the hearing date', () => {
      expect(element.date()).toHaveText(moment(bill.hearing.date).calendar())
    })

    it('shows the hours left', () => {
      expect(element.hoursLeft()).toHaveText('(11 hours left)')
    })

    it('shows the committee name', () => {
      expect(element.committee()).toHaveProp('children', bill.committee.name)
    })

    it('shows the actions', () => {
      expect(element.actions()).toHaveProp('bill', bill)
    })
  })

  describe('when the date is over 23 hours away', () => {
    it('does not show the hours left', () => {
      bill.hearing.date = moment().add(24.1, 'hours').utc()
      loadSubject()
      expect(element.hoursLeft().get(0)).toBeFalsy()
    })
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(Content.container.fragment).toBeTruthy()
  })
})
