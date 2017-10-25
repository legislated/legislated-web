/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { SearchScene } from '../SearchScene'
import { relayRefetchProp } from 'mocks/relayProps'

const { anything } = expect

// subject
let subject
let viewer

function loadSubject (options = { mount: false }) {
  const renderer = options.mount ? mount : (component) => shallow(component).dive().dive()
  subject = renderer(<SearchScene viewer={viewer} />)
}

const element = {
  list: () => subject.find('BillsList'),
  searchField: () => subject.find('SearchField'),
  indicator: () => subject.find('LoadingIndicator')
}

// specs
beforeEach(() => {
  // TODO: build rosie.js factories
  viewer = {
    bills: {
      edges: []
    }
  }
})

afterEach(() => {
  subject = null
})

describe('#state', () => {
  beforeEach(loadSubject)

  it('initially has a blank query', () => {
    expect(subject).toHaveState('query', '')
  })
})

describe('#render', () => {
  it('shows the search field with the current query', () => {
    loadSubject()
    subject.setState({ query: 'foo' })
    expect(element.searchField()).toHaveValue('foo')
  })

  it('shows the bills list', () => {
    loadSubject()
    const list = element.list()
    expect(list).toBePresent()
    expect(list).toHaveProp('viewer', viewer)
  })

  it('hides the loading indicator', () => {
    loadSubject()
    expect(element.indicator()).toHaveProp('isLoading', false)
  })

  describe('when loading', () => {
    it('shows the loading indicator', () => {
      viewer = null
      loadSubject()
      expect(element.indicator()).toHaveProp('isLoading', true)
    })

    it('hides the bills list', () => {
      viewer = null
      loadSubject()
      expect(element.list()).toBeEmpty()
    })
  })
})

describe('on search field change', () => {
  it('updates the visible query', () => {
    loadSubject()
    element.searchField().simulate('change', 'foo')
    expect(subject).toHaveState('query', 'foo')
  })

  it('disables animations', () => {
    loadSubject()
    element.searchField().simulate('change', 'foo')
    expect(element.list()).toHaveProp('animated', false)
  })

  it('refetches the relay query', () => {
    loadSubject()
    element.searchField().simulate('change', 'foo')
    expect(relayRefetchProp.refetch).toHaveBeenLastCalledWith({ query: 'foo' }, null, anything())
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(SearchScene.container).toBeTruthy()
  })
})
