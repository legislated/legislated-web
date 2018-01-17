/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { NavLink } from '../NavLink'

// subject
let subject

const defaults = {
  to: 'test-url-1',
  className: 'test-class',
  location: {
    pathname: 'test-url-2'
  }
}

function loadSubject (props = {}) {
  subject = shallow(<NavLink {...defaultsDeep(props, defaults)} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the link as inactive', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('shows the link as active when the page matches', () => {
    loadSubject({
      location: {
        pathname: 'test-url-1'
      }
    })

    expect(subject).toMatchSnapshot()
  })
})
