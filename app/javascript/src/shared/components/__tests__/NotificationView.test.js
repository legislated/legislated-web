/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { NotificationView } from '../NotificationView'
import { events } from 'shared/events'

jest.mock('shared/async', () => ({
  sleep: () => Promise.resolve()
}))

// subject
let subject

function loadSubject () {
  subject = shallow(<NotificationView />)
}

// spec
afterEach(() => {
  subject = null
})

describe('after receiving a notification', () => {
  it('shows the notification', () => {
    loadSubject()
    subject.instance().componentDidMount()
    events.emit(events.showNotification, 'note')
    expect(subject).toHaveState('isHidden', false)
    expect(subject).toHaveState('notification', 'note')
  })

  it('hides the notification after a delay', async () => {
    loadSubject()
    await subject.instance().didReceiveNotification('note')
    expect(subject).toHaveState('isHidden', true)
    expect(subject).toHaveState('notification', null)
  })
})
