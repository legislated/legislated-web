/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { HomeFooter } from '../HomeFooter'

// subject
let subject

function loadSubject () {
  subject = shallow(<HomeFooter />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the home footer', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})
