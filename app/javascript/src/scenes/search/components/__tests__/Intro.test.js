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

// spec
afterEach(() => {
  subject = null
})

describe('#componentDidMount', () => {
  it('marks the intro as visited', () => {
    loadSubject()
    expect(local.get('intro-visited')).toEqual('true')
  })
})

describe('#render', () => {
  it('shows the intro', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('is blank it\'s already cleared', () => {
    local.set('intro-cleared', 'true')
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('clicking accept', () => {
  it('marks the intro as visited', () => {
    loadSubject()
    subject.instance().didClickAccept()
    expect(subject).toHaveState('isAccepted', true)
    expect(local.get('intro-cleared')).toEqual('true')
  })
})
