/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { RelayRoute } from '../RelayRoute'
import { events } from 'shared/events'
import { currentEnvironment, cacheResolvers } from 'shared/relay'
import { routerProps } from 'mocks/routerProps'

// mocks
jest.mock('shared/relay', () => ({
  currentEnvironment: jest.fn(),
  cacheResolvers: {
    add: jest.fn(),
    remove: jest.fn()
  }
}))

// subject
let subject
let container
let path
let exact
let config = {}

function loadSubject () {
  subject = shallow(<RelayRoute path={path} exact={exact} {...config} />)
}

function loadContainer () {
  loadSubject()
  const Container = element.route().prop('component')
  container = shallow(<Container {...routerProps} />)
}

const element = {
  route: () => subject.find('Route'),
  renderer: () => container.find('QueryRenderer')
}

// spec
afterEach(() => {
  container && container.unmount()
  subject = null
  container = null
})

describe('#render', () => {
  it('propogates the path', () => {
    path = '/test/path'
    loadSubject()
    expect(element.route()).toHaveProp('path', path)
  })

  it(`propogates 'exact'`, () => {
    exact = true
    loadSubject()
    expect(element.route()).toHaveProp('exact', exact)
  })
})

describe('the container', () => {
  describe('#state', () => {
    it('defaults to the current environment', () => {
      const environment = { foo: 'bar' }
      currentEnvironment.mockReturnValueOnce(environment)
      loadContainer()
      expect(container).toHaveState('environment', environment)
    })
  })

  describe('#componentWillMount', () => {
    it('adds the cache resolver if it exists', () => {
      config = { cacheResolver: { foo: 'bar' } }
      loadContainer()
      expect(cacheResolvers.add).toHaveBeenCalledWith(config.cacheResolver)
    })
  })

  describe('#render', () => {
    it('propogates the query', () => {
      config = { query: 'foo' }
      loadContainer()
      expect(element.renderer()).toHaveProp('query', config.query)
    })

    it('combines the initial config variables and route params', () => {
      const params = { bar: 'baz' }
      const variables = { foo: 'bar' }

      routerProps.match.params = params
      config = { getInitialVariables: () => variables }
      loadContainer()

      expect(element.renderer()).toHaveProp('variables', {
        ...variables,
        ...params
      })
    })

    it('delegates to the config render when there is no error', () => {
      const props = { foo: 'bar' }
      config = { render: jest.fn() }
      loadContainer()

      const render = element.renderer().prop('render')
      render({ error: null, props })

      expect(config.render).toHaveBeenCalledWith(props)
    })
  })

  describe('when environment changes', () => {
    it('re-renders with the new environment', () => {
      loadContainer()
      const environment = { bar: 'baz' }
      currentEnvironment.mockReturnValueOnce(environment)

      events.emit(events.setEnvironment)
      expect(element.renderer()).toHaveProp('environment', environment)
    })
  })
})
