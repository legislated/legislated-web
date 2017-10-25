// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { css } from 'glamor'
import { stylesheet, colors, mixins } from 'shared/styles'

export class SearchField extends Component {
  props: {
    value: string,
    styles?: Object,
    onChange: (string) => void
  }

  state = {
    isFocused: false
  }

  // events
  inputDidChange = (event: { target: { value: string } }) => {
    const { onChange } = this.props
    onChange(event.target.value)
  }

  inputDidChangeFocus = (isFocused: boolean) => {
    this.setState({ isFocused })
  }

  // lifecycle
  render () {
    const { value, styles } = this.props
    const { isFocused } = this.state

    return <div {...css(rules.container, styles)}>
      <div {...rules.background} />
      <h1>What's important to you?</h1>
      <div {...css(rules.field, isFocused && rules.focused)}>
        <FontAwesome name='search' />
        <input
          {...rules.input}
          type='text'
          name='search-field'
          value={value}
          placeholder={`health care, HB2364`}
          onChange={this.inputDidChange}
          onFocus={() => this.inputDidChangeFocus(true)}
          onBlur={() => this.inputDidChangeFocus(false)} />
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column',
    '> h1': {
      marginBottom: 15
    }
  },
  field: {
    ...mixins.shadows.low(),
    ...mixins.borders.low(),
    display: 'flex',
    alignItems: 'center',
    maxWidth: 700,
    height: 50,
    padding: '0 15px',
    backgroundColor: colors.neutral,
    transition: 'box-shadow 0.25s, border 0.25s, transform 0.25s',
    transform: 'perspective(200px) translateZ(0px)',
    cursor: 'text',
    ' .fa': {
      width: 15,
      marginRight: 15,
      transition: 'color 0.25'
    },
    ...mixins.mobile({
      width: 'auto'
    })
  },
  focused: {
    ...mixins.shadows.high(),
    ...mixins.borders.high(),
    transform: 'perspective(200px) translateZ(1px)',
    ' .fa': {
      color: colors.primary
    }
  },
  input: {
    ...mixins.fonts.regular,
    flex: 1,
    fontSize: 20,
    border: 'none',
    '::placeholder': {
      color: '#DEDEDE'
    },
    ':focus': {
      outline: 'none'
    }
  }
})
