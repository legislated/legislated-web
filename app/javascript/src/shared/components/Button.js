// @flow
import React, { Component } from 'react'
import { css } from 'glamor'
import { Link } from './Link'
import { stylesheet, colors, mixins } from 'shared/styles'
import type { LinkProps } from './Link'

type ButtonType = 'solid' | 'outline'

export class Button extends Component {
  props: {
    label: string,
    iconName: string,
    type?: ButtonType,
  } & LinkProps

  // lifecycle
  render () {
    const { type, label, iconName, styles, ...linkProps } = this.props

    const isSolid = type === 'solid'
    const linkRule = css(rules.button, isSolid && rules.solid, styles)

    return (
      <Link styles={linkRule} {...linkProps}>
        <span>{label}</span>
      </Link>
    )
  }
}

const rules = stylesheet({
  button: {
    ...mixins.borders.high(),
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    borderRadius: 3,
    fontSize: 16,
    textDecoration: 'none',
    ...mixins.mobile.glam({
      padding: 9
    })
  },
  solid: {
    border: 'none',
    backgroundColor: colors.primary,
    color: colors.white
  },
  icon: {
    width: 16,
    marginRight: 5,
    textAlign: 'center'
  }
})
