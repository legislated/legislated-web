/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { SearchFiltersSubset } from '../SearchFiltersSubset'

// subject
let subject

const defaults = {
  entry: {
    label: 'test-label',
    value: 'test-value'
  },
  value: 'test-value',
  onChange: jest.fn()
}

function loadSubject (props = {}) {
  subject = shallow(<SearchFiltersSubset {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the subset filter', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})
