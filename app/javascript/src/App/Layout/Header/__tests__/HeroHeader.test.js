/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { findDOMNode as findDomNode } from 'react-dom'
import { HeroHeader } from '../HeroHeader'

// mocks
jest.mock('react-dom')

const getBoundingClientRect = jest.fn()

findDomNode.mockReturnValue({
  parentElement: {
    getBoundingClientRect
  }
})

// subject
let subject

function loadSubject () {
  subject = shallow(<HeroHeader />)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the sticky navbar after scrolling', () => {
    loadSubject()
    subject.setState({ isSticky: true })
    expect(subject).toMatchSnapshot()
  })
})

describe('scrolling', () => {
  it('stickies the navbar once it scrolls below the top of the page', () => {
    loadSubject()
    getBoundingClientRect.mockReturnValueOnce({ top: -1 })
    subject.instance().didScroll()
    expect(subject).toHaveState('isSticky', true)
  })

  it('unstickies the navbar once it scrolls above the top of the page', () => {
    loadSubject()
    subject.setState({ isSticky: true })
    getBoundingClientRect.mockReturnValueOnce({ top: 1 })
    subject.instance().didScroll()
    expect(subject).toHaveState('isSticky', false)
  })
})
