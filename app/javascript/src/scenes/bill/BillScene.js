// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { withRouter } from 'react-router-dom'
import { Content } from './components'
import { stylesheet, colors, mixins } from 'shared/styles'
import type { Viewer } from 'shared/types'

let BillScene = class BillScene extends Component {
  props: {
    viewer: ?Viewer,
  }

  // lifecycle
  render () {
    const { viewer } = this.props

    return <div {...rules.container}>
      <div {...rules.content}>
        {viewer ? <Content bill={viewer.bill} /> : <div>Loading...</div>}
      </div>
    </div>
  }
}

BillScene = createFragmentContainer(withRouter(BillScene), graphql`
  fragment BillScene_viewer on Viewer {
    bill(id: $id) {
      ...Content_bill
    }
  }
`)

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    ...mixins.shadows.low(),
    ...mixins.borders.low(),
    padding: 15,
    backgroundColor: colors.neutral
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    '> .fa': {
      marginRight: 5,
      fontSize: 13
    }
  }
})

export { BillScene }
