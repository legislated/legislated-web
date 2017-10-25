// @flow
import React, { Component } from 'react'

export class Element extends Component {
  props: {
    label: string,
    children?: any
  }

  render () {
    const { label, children } = this.props

    return <div>
      <h3>{label}</h3>
      <p>{children}</p>
    </div>
  }
}
