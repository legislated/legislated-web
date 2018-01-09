// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { withRouter } from 'react-router-dom'
import type { ContextRouter } from 'react-router-dom'
import { signOut } from '@/functions'
import { Button } from '@/components'
import type { Viewer } from '@/types'

type AdminBillsProps = {
  viewer: ?Viewer,
} & ContextRouter

let AdminBillsScene = class AdminBillsScene extends Component {
  props: AdminBillsProps

  // helpers
  signOut = () => {
    signOut()
    this.props.history.replace('/admin/sign-in')
  }

  // lifecycle
  componentWillReceiveProps (nextProps: AdminBillsProps) {
    const { viewer } = nextProps

    if (viewer && !viewer.isAdmin) {
      this.signOut()
    }
  }

  render () {
    return <div>
      <Button
        onClick={this.signOut}
        children='Sign Out'
      />
      Hello Admin Bills
    </div>
  }
}

AdminBillsScene = createFragmentContainer(withRouter(AdminBillsScene), graphql`
  fragment AdminBillsScene_viewer on Viewer {
    isAdmin
    bills(first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
`)

export { AdminBillsScene }
