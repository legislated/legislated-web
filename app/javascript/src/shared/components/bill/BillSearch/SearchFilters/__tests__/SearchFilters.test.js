/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { SearchFilters } from '../SearchFilters'

// subject
let subject

const defaults = {
  params: {
    subset: 'test-subset',
    other: 'test-other'
  },
  onChange: jest.fn()
}

function loadSubject (props = {}) {
  subject = shallow(<SearchFilters {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the search filters', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('changing a filter', () => {
  it('sets the value when checked', () => {
    loadSubject()

    subject.instance().didChangeFilter({
      target: {
        name: 'subset',
        value: 'foo',
        checked: true
      }
    })

    expect(defaults.onChange).toHaveBeenCalledWith({
      ...defaults.params,
      subset: 'foo'
    })
  })

  it('clears the value when unchecked', () => {
    loadSubject()

    subject.instance().didChangeFilter({
      target: {
        name: 'subset',
        value: 'foo',
        checked: false
      }
    })

    expect(defaults.onChange).toHaveBeenCalledWith({
      ...defaults.params,
      subset: null
    })
  })
})
