/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { LoadingIndicator } from '../LoadingIndicator'

// subject
let subject
let isLoading

function loadSubject () {
  subject = shallow(<LoadingIndicator isLoading={isLoading} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the indicator when loading', () => {
    isLoading = true
    loadSubject()
    expect(subject.children()).toBePresent()
  })

  it('hides the indiciator when not loading', () => {
    isLoading = false
    loadSubject()
    expect(subject.children()).toBeEmpty()
  })
})
