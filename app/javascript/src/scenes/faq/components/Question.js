// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { stylesheet, mixins } from 'shared/styles'

export class Question extends Component {
  props: {
    title: string,
    children?: any
  }

  // lifecycle
  render () {
    const { title, children } = this.props
    return <div {...rules.question}>
      <h3><FontAwesome {...rules.icon} name='question-circle' />{title}</h3>
      {children}
    </div>
  }
}

const rules = stylesheet({
  question: {
    ...mixins.borders.low(['top']),
    marginTop: 15,
    paddingTop: 15,
    '> h3': {
      marginBottom: 10
    }
  },
  icon: {
    marginRight: 5
  }
})
