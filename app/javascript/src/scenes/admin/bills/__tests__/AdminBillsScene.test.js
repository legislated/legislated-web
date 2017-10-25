/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { AdminBillsScene } from '../AdminBillsScene'
import { auth } from 'shared/auth'
import { routerProps } from 'mocks/routerProps'

// mocks
jest.mock('shared/auth', () => ({
  auth: { signOut: jest.fn() }
}))

// subject
let subject
let viewer

function loadSubject () {
  subject = shallow(<AdminBillsScene viewer={viewer} />).dive().dive()
}

// spec
afterEach(() => {
  subject = null
})

describe('#componentWillReceiveProps', () => {
  it('signs the user out if not an admin', () => {
    loadSubject()
    viewer = { isAdmin: false }
    subject.instance().componentWillReceiveProps({ viewer })
    expect(auth.signOut).toHaveBeenCalled()
  })

  it('redirects to the admin sign-in when not an admin', () => {
    loadSubject()
    viewer = { isAdmin: false }
    subject.instance().componentWillReceiveProps({ viewer })
    expect(routerProps.history.replace).toHaveBeenCalledWith('/admin/sign-in')
  })
})

xdescribe('the relay container', () => {
})
