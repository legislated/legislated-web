/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { MobileNavButton } from '../MobileNavButton'

// subject
let subject
let onClick

function loadSubject () {
  subject = shallow(<MobileNavButton onClick={onClick} />)
}

// spec
afterEach(() => {
  subject = null
  onClick = null
})

describe('on click', () => {
  it('calls the handler', () => {
    onClick = jest.fn()
    loadSubject()
    subject.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
