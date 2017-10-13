/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { CopyLink } from '../CopyLink'
import { events } from 'shared/events'

// mocks
jest.mock('shared/events', () => ({
  events: {
    emit: jest.fn(),
    showNotification: 'show-notification'
  }
}))

// subject
let subject
let value

function loadSubject () {
  subject = shallow(<CopyLink value={value} />)
}

const element = {
  clipboard: () => subject.find('CopyToClipboard')
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

describe('on copy', () => {
  it('fires a notification', () => {
    loadSubject()
    value = 'http://fake.url/'
    element.clipboard().simulate('copy', value)
    expect(events.emit).toHaveBeenCalledWith('show-notification', {
      key: 'copy-link',
      message: expect.stringMatching(/[Cc]opied/)
    })
  })
})
