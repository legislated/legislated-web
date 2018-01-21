/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { BillSearch } from '../BillSearch'

const { anything } = expect

// subject
let subject

const defaults = {
  viewer: 'test-viewer',
  pageSize: 'test-size',
  onFilter: jest.fn(),
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

describe('#filterBillsForQuery', () => {
  it('disables animations', () => {
    loadSubject()
    subject.instance().filterBillsForQuery('foo')
    expect(subject).toHaveState('disablesAnimation', true)
  })

  it('reteches the bills', () => {
    loadSubject()
    subject.instance().filterBillsForQuery('foo')
    expect(defaults.relay.refetch).toHaveBeenCalledWith({ filter: { query: 'foo' } }, null, anything())
  })

  it('notifies the handler', () => {
    loadSubject()
    subject.instance().filterBillsForQuery('foo')
    expect(defaults.onFilter).toHaveBeenCalledWith({ query: 'foo' })
  })
})

describe('entering a query', () => {
  it('filters bills by the query', () => {
    loadSubject()
    const instance = subject.instance()
    instance.filterBillsForQuery = jest.fn()

    instance.searchFieldDidChange('foo')
    expect(subject).toHaveState('query', 'foo')
    expect(instance.filterBillsForQuery).toHaveBeenCalled()
  })
})
