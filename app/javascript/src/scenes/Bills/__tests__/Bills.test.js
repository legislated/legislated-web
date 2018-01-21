/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { defaultsDeep } from 'lodash'
import { Bills } from '../Bills'

// subject
let subject

const defaults = {
  viewer: 'test-viewer',
  location: {
    state: null
  }
}

function loadSubject (props = {}) {
  subject = shallow(<Bills {...defaultsDeep(props, defaults)} />)
}

// specs
afterEach(() => {
  subject = null
})

describe('#render', () => {
  it('shows the home scene', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })

  it('shows the bill search with the correct params', () => {
    loadSubject({
      location: {
        state: {
          params: 'test-params'
        }
      }
    })

    expect(subject).toMatchSnapshot()
  })
})
