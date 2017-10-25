/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Container } from '../Container'
import { local } from 'shared/storage'
import { routerProps } from 'mocks/routerProps'

// subject
let subject

function loadSubject () {
  subject = shallow(<Container />).dive()
}

// spec
describe('#componentWillMount', () => {
  it(`clears the intro after it's visited and not on the search screen`, () => {
    routerProps.location.pathname = '/faq'
    local.set('intro-visited', 'true')
    loadSubject()

    expect(local.get('intro-cleared')).toBe('true')
  })
})

describe('#componentDidUpdate', () => {
  it(`clears the intro after it's visited and not on the search screen`, () => {
    loadSubject()
    routerProps.location.pathname = '/faq'
    local.set('intro-visited', 'true')

    subject.instance().componentDidUpdate({})
    expect(local.get('intro-cleared')).toBe('true')
  })
})
