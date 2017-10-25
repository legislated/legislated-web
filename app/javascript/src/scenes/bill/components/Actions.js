// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Button } from 'shared/components'
import { stylesheet, mixins } from 'shared/styles'
import type { Bill } from 'shared/types'

let Actions = class Actions extends Component {
  props: {
    bill: Bill
  }

  // lifecycle
  render () {
    const { bill } = this.props

    return <div {...rules.actions}>
      <div>
        <Button
          styles={rules.button}
          to={bill.witnessSlipUrl}
          label='Take Action'
          iconName='pencil-square-o'
          type='solid' />
        <Button
          styles={rules.button}
          to={bill.witnessSlipResultUrl}
          label='View Results'
          iconName='list-ul' />
      </div>
      <div>
        <Button
          styles={rules.button}
          to={bill.detailsUrl}
          label='View Details'
          iconName='info-circle' />
        <Button
          styles={rules.button}
          to={bill.fullTextUrl}
          label='View Full Text'
          iconName='file-text-o' />
      </div>
    </div>
  }
}

Actions = createFragmentContainer(Actions, graphql`
  fragment Actions_bill on Bill {
    detailsUrl
    fullTextUrl
    witnessSlipUrl
    witnessSlipResultUrl
  }
`)

const rules = stylesheet({
  actions: {
    display: 'flex',
    '> div': {
      display: 'flex'
    },
    '> div + div': {
      marginLeft: 10
    },
    ...mixins.mobile({
      flexDirection: 'column',
      '> div + div': {
        marginLeft: 0,
        marginTop: 10
      }
    })
  },
  button: {
    marginRight: 10,
    ':last-child': {
      marginRight: 0
    },
    ...mixins.mobile({
      flex: 1,
      overflow: 'hidden',
      ':last-child': {
        marginRight: 0
      },
      '> span:last-child': {
        direction: 'rtl',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    })
  }
})

export { Actions }
