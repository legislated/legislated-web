/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { SearchField } from '../SearchField'

// subject
let subject

const defaults = {
  value: 'test-value',
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
  it('notifies its parent', () => {
    loadSubject()
    subject.instance().inputDidChange({ target: { value: 'foo' } })
    expect(defaults.onChange).toHaveBeenCalledWith('foo')
  })
})

describe('focusing the input', () => {
  it('focuses the component', () => {
    loadSubject()
    subject.instance().inputDidChangeFocus(true)()
    expect(subject).toHaveState('isFocused', true)
  })
})
