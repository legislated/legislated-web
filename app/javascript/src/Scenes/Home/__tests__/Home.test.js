/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { Home } from '../Home'

// mocks
jest.mock('@/functions/relay/createRenderer')

// subject
let subject

const defaults = {
  viewer: 'test-viewer',
  history: {
    push: jest.fn()
  }
}

function loadSubject (props = {}) {
  subject = shallow(<Home {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the home scene', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('clicking view all', () => {
  it('shows the bills page with the current query', () => {
    loadSubject()
    const instance = subject.instance()

    const params = { test: 'params' }
    instance.didChangeParams(params)
    instance.didClickViewAll()

    expect(defaults.history.push).toHaveBeenCalledWith({
      pathname: '/bills',
      state: { params }
    })
  })
})
