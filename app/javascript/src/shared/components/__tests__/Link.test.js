/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { Link } from '../Link'

// subject
let subject
let url = 'url'
let onClick = null
let label = 'label'
let iconName = 'icon'

function loadSubject () {
  subject = shallow(<Link to={url} onClick={onClick} label={label} iconName={iconName} />)
}

const element = {
  anchor: () => subject.find('a'),
  link: () => subject.find('Link')
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  describe('with an absolute link', () => {
    beforeEach(() => {
      url = 'http://www.google.com'
    })

    it('shows as an anchor', () => {
      loadSubject()
      expect(element.anchor()).toHaveProp('href', url)
    })

    it('responds to click events', () => {
      onClick = () => {}
      loadSubject()
      expect(element.anchor()).toHaveProp('onClick', onClick)
    })
  })

  describe('with a relative link', () => {
    beforeEach(() => {
      url = 'bills'
    })

    it('shows as a route link', () => {
      url = 'bills'
      loadSubject()
      expect(element.link()).toHaveProp('to', url)
    })

    it('responds to click events', () => {
      onClick = () => {}
      loadSubject()
      expect(element.link()).toHaveProp('onClick', onClick)
    })
  })

  describe('with no url or click handler', () => {
    it('shows nothing', () => {
      url = null
      onClick = null
      loadSubject()
      expect(subject.get(0)).toBeFalsy()
    })
  })
})
