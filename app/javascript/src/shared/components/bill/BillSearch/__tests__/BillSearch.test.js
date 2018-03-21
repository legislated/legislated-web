/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { BillSearch } from '../BillSearch'

const { anything } = expect

// mocks
jest.mock('lodash', () => ({
  throttle: (fn) => fn
}))

// subject
let subject

const defaults = {
  viewer: 'test-viewer',
  pageSize: 'test-size',
  onChange: jest.fn(),
  relay: {
    refetch: jest.fn()
  }
}

function loadSubject (props = {}) {
  subject = shallow(<BillSearch {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the search view', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('shows the search view with default params', () => {
    loadSubject({
      params: {
        query: 'test-query'
      }
    })

    expect(subject).toMatchSnapshot()
  })

  it('shows the loading indicator when loading', () => {
    loadSubject({
      viewer: null
    })

    expect(subject).toMatchSnapshot()
  })
})

describe('changing the params', () => {
  const params = { test: 'query' }

  it('stores the params', () => {
    loadSubject()
    subject.instance().didChangeParams(params)
    expect(subject).toHaveState('params', params)
  })

  it('starts the re-fetch', () => {
    loadSubject()
    subject.instance().didChangeParams(params)
    expect(subject).toHaveState('disablesAnimation', true)
    expect(defaults.relay.refetch).toHaveBeenCalledWith({ params }, null, anything())
  })

  it('re-enables animations on completion', () => {
    jest.useFakeTimers()
    defaults.relay.refetch.mockImplementationOnce((_, _p, completion) => completion())

    loadSubject()
    subject.instance().didChangeParams(params)
    jest.runOnlyPendingTimers()

    expect(subject).toHaveState('disablesAnimation', false)
  })

  it('notifies the handler', () => {
    loadSubject()
    subject.instance().didChangeParams(params)
    expect(defaults.onChange).toHaveBeenCalledWith(params)
  })
})
