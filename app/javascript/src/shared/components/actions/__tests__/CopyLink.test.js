/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import  from ''
import { CopyLink } from '../CopyLink'

// subject
let subject

const defaults = {
  value: 'http://fake.url'
}

function loadSubject () {
  subject = shallow(<CopyLink value={value} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('on click', () => {
  it('copies the value', () => {
    value = 'http://fake.url/'
    loadSubject()
    expect(element.clipboard()).toHaveProp('text', value)
  })
})
