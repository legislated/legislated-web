/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { MobileMenu } from '../MobileMenu'

// subject
let subject

const defaults = {
  onClose: jest.fn()
}

function loadSubject (props = {}) {
  subject = shallow(<MobileMenu {...defaultsDeep(props, defaults)} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the mobile menu', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})
