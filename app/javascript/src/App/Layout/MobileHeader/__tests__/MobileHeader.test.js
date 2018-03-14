
/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { MobileHeader } from '../MobileHeader'

// subject
let subject

function loadSubject (props = {}) {
  subject = shallow(<MobileHeader {...props} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the closed menu', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('shows the open menu', () => {
    loadSubject()
    subject.setState({ isOpen: true })
    expect(subject).toMatchSnapshot()
  })
})
