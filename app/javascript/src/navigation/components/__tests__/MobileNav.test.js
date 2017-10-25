/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { MobileNav } from '../MobileNav'

// subject
let subject

function loadSubject () {
  subject = shallow(<MobileNav />)
}

let element = {
  button: () => subject.find('MobileNavButton'),
  overlay: () => subject.children('div'),
  links: () => subject.find('NavLinkList')
}

// spec
afterEach(() => {
  subject = null
})

describe('#state', () => {
  it('default the menu to closed', () => {
    loadSubject()
    expect(subject).toHaveState('isOpen', false)
  })

  it('shows the menu when open', () => {
    loadSubject()
    subject.setState({ isOpen: true })
    expect(element.overlay()).toMatchRule('nzpuq9')
  })
})

describe('#render', () => {
  it('shows the nav link icons', () => {
    loadSubject()
    expect(element.links()).toHaveProp('showsIcons', true)
  })
})

describe('when the user taps the button', () => {
  it('opens the menu', () => {
    loadSubject()
    element.button().simulate('click')
    expect(subject).toHaveState('isOpen', true)
  })
})

describe('when the user taps the overlay', () => {
  it('closes the menu', () => {
    loadSubject()
    subject.setState({ isOpen: true })
    element.overlay().simulate('click')
    expect(subject).toHaveState('isOpen', false)
  })
})

describe('when the user taps a nav link', () => {
  it('closes the menu', () => {
    loadSubject()
    subject.setState({ isOpen: true })
    element.links().simulate('click')
    expect(subject).toHaveState('isOpen', false)
  })
})
