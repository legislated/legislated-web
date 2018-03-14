/* eslint-env jest */
import * as React from 'react'
import { defaultsDeep } from 'lodash'
import { shallow } from 'enzyme'
import { BillCell } from '../BillCell'

// subject
let subject

const defaults = {
  bill: {
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
}

function loadSubject (props = {}) {
  subject = shallow(<BillCell {...defaultsDeep(props, defaults)} />)
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

  it('hides the summary when missing', () => {
    loadSubject({
      bill: { summary: '' }
    })

    expect(subject).toMatchSnapshot()
  })
})
