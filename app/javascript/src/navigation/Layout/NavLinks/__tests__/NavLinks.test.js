/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { NavLinks } from '../NavLinks'

// subject
let subject

const defaults = {
  onClick: jest.fn(),
  className: 'test-class'
}

function loadSubject (props = {}) {
  subject = shallow(<NavLinks {...defaultsDeep(props, defaults)} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the nav links', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})
