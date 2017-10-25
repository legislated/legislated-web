/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Intro } from '../Intro'
import { local } from 'shared/storage'

// subject
let subject

function loadSubject () {
  subject = shallow(<Intro />)
}

const element = {
  animation: () => subject.find('BillAnimation'),
  accept: () => subject.find('Link').at(1)
}

// spec
afterEach(() => {
  subject = null
})

describe('#state', () => {
  it('defaults to unaccepted', () => {
    loadSubject()
    expect(subject).toHaveState('isAccepted', false)
  })
})

describe('#componentWillMount', () => {
  it('marks the intro as visited', () => {
    loadSubject()
    expect(local.get('intro-visited')).toEqual('true')
  })
})

describe('#render', () => {
  it(`is blank it's already cleared`, () => {
    local.set('intro-cleared', 'true')
    loadSubject()
    expect(subject.get(0)).toBeFalsy()
  })
})

describe('when the user clicks accept', () => {
  it('hides the intro', () => {
    loadSubject()
    element.accept().simulate('click')
    expect(element.animation().children()).toHaveLength(0)
  })

  it('marks the intro as visited', () => {
    loadSubject()
    element.accept().simulate('click')
    expect(local.get('intro-visited')).toEqual('true')
  })
})
