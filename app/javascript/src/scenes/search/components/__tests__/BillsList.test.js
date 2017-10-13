/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { BillsList } from '../BillsList'
import { routerProps } from 'mocks/routerProps'
import { session } from 'shared/storage'
import { relayPaginationProp } from 'mocks/relayProps'

const { anything } = expect

// mocks
jest.mock('../../searchRoute', () => {
  const moment = require('moment')
  const constants = {
    count: 999,
    startDate: moment().month(4).date(1),
    endDate: moment().month(4).date(7)
  }

  return { constants }
})

// subject
let subject
let viewer
let animated

function loadSubject () {
  subject = shallow(<BillsList viewer={viewer} animated={animated} />).dive().dive()
}

function edges (nodes) {
  return nodes.map((node) => ({ node }))
}

const element = {
  bills: () => subject.find('BillCell'),
  date: () => subject.find('div > div > div').at(0),
  count: () => subject.find('div > div > div').at(1),
  animation: () => subject.find('BillAnimation'),
  loadButton: () => subject.find('LoadMoreButton')
}

// specs
beforeEach(() => {
  // TODO: build rosie.js factories
  viewer = {
    bills: {
      edges: []
    }
  }

  animated = true
})

afterEach(() => {
  subject = null
})

describe('#state', () => {
  it('enables animations by default', () => {
    loadSubject()
    expect(element.animation()).toHaveProp('disable', false)
  })
})

describe('#componentWillMount', () => {
  it('disables animations on pop', () => {
    routerProps.history.action = 'POP'
    loadSubject()
    expect(element.animation()).toHaveProp('disable', true)
  })
})

describe('#componentDidMount', () => {
  it('re-enables animations on pop', () => {
    routerProps.history.action = 'POP'
    loadSubject()
    subject.instance().componentDidMount()
    expect(element.animation()).toHaveProp('disable', false)
  })
})

describe('#componentWillUnmount', () => {
  it('stores the visible bill count', () => {
    const bills = [{ id: 1 }, { id: 2 }, { id: 3 }]
    viewer.bills.edges = edges(bills)
    loadSubject()

    subject.unmount()
    expect(session.get('last-search-count')).toEqual(`${bills.length}`)
  })
})

describe('#render', () => {
  it('shows the start date', () => {
    loadSubject()
    expect(element.date()).toHaveText('May 1st to May 7th')
  })

  it('shows the total bill count', () => {
    viewer.bills.count = 2
    loadSubject()
    expect(element.count()).toIncludeText('Found 2 results')
  })

  it('shows a bill cell for every bill', () => {
    const bills = [{ id: 1 }, { id: 2 }]
    viewer.bills.edges = edges(bills)
    loadSubject()

    const cells = element.bills()
    expect(cells.length).toEqual(bills.length)
    expect(cells.map((c) => c.prop('bill'))).toEqual(bills)
  })

  it(`shows the load more button when there's another page`, () => {
    relayPaginationProp.hasMore.mockReturnValue(true)
    loadSubject()
    expect(element.loadButton()).toHaveProp('hasMore', true)
  })
})

describe('on clicking load more', () => {
  beforeEach(() => {
    relayPaginationProp.hasMore.mockReturnValue(true)
  })

  it('loads another page', () => {
    loadSubject()
    element.loadButton().simulate('click')
    expect(relayPaginationProp.loadMore).toHaveBeenCalledWith(999, anything())
  })

  it('does nothing if there this is the last page', () => {
    relayPaginationProp.hasMore.mockReturnValue(false)
    loadSubject()
    element.loadButton().simulate('click')
    expect(relayPaginationProp.loadMore).not.toHaveBeenCalled()
  })

  it('does nothing when already loading', () => {
    relayPaginationProp.isLoading.mockReturnValue(true)
    loadSubject()
    element.loadButton().simulate('click')
    expect(relayPaginationProp.loadMore).not.toHaveBeenCalled()
  })
})

describe('the relay container', () => {
  it('exists', () => {
    expect(BillsList.container).toBeTruthy()
  })

  it('exposes the connection', () => {
    const { getConnectionFromProps } = BillsList.container.options
    expect(getConnectionFromProps({ viewer })).toBe(viewer.bills)
  })
})
