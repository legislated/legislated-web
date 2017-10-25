/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { NavLink } from '../NavLink'

// subject
let subject
let label = 'label'
let iconName = 'icon'

function loadSubject () {
  subject = shallow(<NavLink label={label} iconName={iconName} />)
}

let element = {
  icon: () => subject.find('FontAwesome'),
  label: () => subject.find('span')
}

// spec
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the icon', () => {
    iconName = 'foo'
    loadSubject()
    expect(element.icon()).toHaveProp('name', iconName)
  })

  it('shows the label', () => {
    label = 'just, click it already'
    loadSubject()
    expect(element.label()).toHaveText(label)
  })
})
