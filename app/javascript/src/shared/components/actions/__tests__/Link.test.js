/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { Link } from '../Link'

// subject
let subject

const defaults = {
  className: 'test-class',
  children: 'test-children'
}

function loadSubject (props = {}) {
  subject = shallow(<Link {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows an anchor with an absolute url', () => {
    loadSubject({ to: 'http://www.test.com' })
    expect(subject).toMatchSnapshot()
  })

  it('shows a route link with a relative url', () => {
    loadSubject({ to: '/bills' })
    expect(subject).toMatchSnapshot()
  })

  it('hides if there is no url or click handler', () => {
    loadSubject()
    expect(subject.get(0)).toBe(null)
  })
})
