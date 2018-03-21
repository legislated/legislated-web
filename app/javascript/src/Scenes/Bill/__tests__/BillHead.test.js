/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { BillHead } from '../BillHead'

// subject
let subject

const defaults = {
  bill: {
    title: 'Foo',
    summary: 'A bill, fantastic',
    document: {
      number: 'HB1234'
    }
  }
}

function loadSubject (props = {}) {
  subject = shallow(<BillHead {...defaultsDeep(props, defaults)} />)
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
})
