/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { NavLinkList } from '../NavLinkList'

// subject
let subject
let showsIcons = false

function loadSubject () {
  subject = shallow(<NavLinkList showsIcons={showsIcons} />)
}

let element = {
  faq: () => subject.find('NavLink').at(1),
  about: () => subject.find('NavLink').at(2)
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('hides the faq and about icons', () => {
    showsIcons = false
    loadSubject()
    expect(element.faq()).toHaveProp('iconName', null)
    expect(element.about()).toHaveProp('iconName', null)
  })

  it('shows the faq and about icons when flagged', () => {
    showsIcons = true
    loadSubject()
    expect(element.faq()).toHaveProp('iconName', 'question')
    expect(element.about()).toHaveProp('iconName', 'heart')
  })
})
