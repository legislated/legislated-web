/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Layout } from '../Layout'
import { defaultsDeep } from 'lodash'
import { local } from 'shared/storage'

// subject
let subject

const defaults = {
  location: {
    pathname: '/'
  }
}

function loadSubject (props = {}) {
  subject = shallow(<Layout {...defaultsDeep(props, defaults)} />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#componentDidMount', () => {
  it('clears the intro after it has been visited', () => {
    local.set('intro-visited', 'true')
    loadSubject({
      location: {
        pathname: '/faq'
      }
    })

    expect(local.get('intro-cleared')).toEqual('true')
  })
})

describe('#componentDidUpdate', () => {
  it('clears the intro after it has been visited', () => {
    local.set('intro-visited', 'true')
    loadSubject()

    subject.setProps({
      location: {
        pathname: '/faq'
      }
    })

    expect(local.get('intro-cleared')).toEqual('true')
  })
})
