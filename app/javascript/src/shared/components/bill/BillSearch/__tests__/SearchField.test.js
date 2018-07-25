/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { SearchField } from '../SearchField'

// subject
let subject

const defaults = {
  params: {
    query: 'test-query',
    other: 'test-other'
  },
  onChange: jest.fn()
}

function loadSubject (props = {}) {
  subject = shallow(<SearchField {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the search field', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('entering a value', () => {
  const event = {
    target: {
      value: 'foo'
    }
  }

  it('notifies its parent', () => {
    loadSubject()
    subject.instance().didChangeQuery(event)
    expect(defaults.onChange).toHaveBeenCalledWith({
      ...defaults.params,
      query: 'foo'
    })
  })
})

describe('focusing the input', () => {
  it('focuses the component', () => {
    loadSubject()
    subject.instance().didChangeFocus(true)()
    expect(subject).toHaveState('isFocused', true)
  })
})
