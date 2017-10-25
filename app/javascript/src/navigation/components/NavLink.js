// @flow
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { css } from 'glamor'
import { Link } from 'shared/components'
import type { LinkProps } from 'shared/components/Link'
import { stylesheet, mixins } from 'shared/styles'

export class NavLink extends Component {
  props: {
    label: string,
    iconName: ?string
  } & LinkProps

  // lifecycle
  render () {
    const { label, iconName, styles, ...linkProps } = this.props
    const linkRule = css(rules.link, styles)

    return <Link styles={linkRule} {...linkProps}>
      {iconName && <FontAwesome {...rules.icon} name={iconName} />}
      <span>{label}</span>
    </Link>
  }
}

const rules = stylesheet({
  link: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    textDecoration: 'none',
    ...mixins.mobile({
      ...mixins.borders.low(['bottom']),
      marginBottom: 15,
      paddingBottom: 15,
      fontSize: 22
    })
  },
  icon: {
    width: 20,
    marginRight: 6,
    textAlign: 'center',
    ...mixins.mobile({
      width: 22,
      marginRight: 8
    })
  }
})
