/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { AdminRoutes } from '../AdminRoutes'
import { auth } from 'shared/auth'
import { routerProps } from 'mocks/routerProps'

// mocks
jest.mock('shared/auth', () => ({
  auth: {
    isSignedInFn: jest.fn(),
    get isSignedIn () { return this.isSignedInFn() }
  }
}))

// subject
let subject

function loadSubject () {
  subject = shallow(<AdminRoutes {...routerProps} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('redirects to the sign-in page when not signed-in', () => {
    auth.isSignedInFn.mockReturnValue(false)
    routerProps.location.pathname = '/admin/bills'
    loadSubject()

    expect(subject).toMatchSelector('Redirect')
    expect(subject).toHaveProp('to', '/admin/sign-in')
  })

  it('redirects to the bills page when signed-in and viewing the sign-in page', () => {
    auth.isSignedInFn.mockReturnValue(true)
    routerProps.location.pathname = '/admin/sign-in'
    loadSubject()

    expect(subject).toMatchSelector('Redirect')
    expect(subject).toHaveProp('to', '/admin/bills')
  })
})
