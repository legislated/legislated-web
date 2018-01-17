/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { Home } from '../Home'

// subject
let subject

const defaults = {
  viewer: 'test-viewer'
}

function loadSubject (props = {}) {
  subject = shallow(<Home {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the scene', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})
