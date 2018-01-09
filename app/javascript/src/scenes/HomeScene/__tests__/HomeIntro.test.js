/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { HomeIntro } from '../HomeIntro'
import { local } from '@/storage'

// subject
let subject

function loadSubject () {
  subject = shallow(<HomeIntro />)
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

  it('hides the intro when cleared', () => {
    local.set('intro-cleared', 'true')
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('clicking accept', () => {
  it('marks the intro as cleared', () => {
    loadSubject()
    subject.instance().didClickAccept()
    expect(subject).toHaveState('isAccepted', true)
    expect(local.get('intro-cleared')).toEqual('true')
  })
})
