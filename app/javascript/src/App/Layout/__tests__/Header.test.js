/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../Header'

// subject
let subject

function loadSubject (props = {}) {
  subject = shallow(<Header {...props} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the header', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})
