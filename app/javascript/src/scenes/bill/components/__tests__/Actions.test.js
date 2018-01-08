/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { Actions } from '../Actions'

// subject
let subject

const defaults = {
  bill: {
    witnessSlipUrl: 'http://www.test.com/slip',
    witnessSlipResultUrl: 'http://www.test.com/result',
    billDetailsUrl: 'http://www.test.com/details',
    fullTextUrl: 'http://www.test.com/text'
  }
}

function loadSubject (props = {}) {
  subject = shallow(<Actions {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the actions', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})
