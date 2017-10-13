/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { LoadMoreButton } from '../LoadMoreButton'

// subject
let subject
let hasMore
let onClick

function loadSubject () {
  subject = shallow(<LoadMoreButton hasMore={hasMore} onClick={onClick} />)
}

const element = {
  link: () => subject.find('a')
}

// specs
beforeEach(() => {
  hasMore = true
  onClick = jest.fn()
})

afterEach(() => {
  subject = null
})

describe('#render', () => {
  describe('when there is more to load', () => {
    beforeEach(loadSubject)

    it('renders the button', () => {
      expect(element.link()).toBePresent()
    })
  })

  describe('when has more is false', () => {
    beforeEach(() => {
      hasMore = false
      loadSubject()
    })

    it('hides the button', () => {
      expect(subject.children()).toBeEmpty()
    })
  })
})

describe('on click', () => {
  beforeEach(() => {
    loadSubject()
    element.link().prop('onClick')()
  })

  it('notifies its parent', () => {
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
