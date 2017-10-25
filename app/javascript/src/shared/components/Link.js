// @flow
import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { css } from 'glamor'
import type { Rule } from 'glamor'
import { stylesheet, colors } from 'shared/styles'

export type LinkProps = {
  to?: string,
  onClick?: () => void,
  styles?: Rule,
}

export class Link extends Component {
  props: {
    children?: any
  } & LinkProps

  // lifecycle
  render () {
    const { to: url, onClick, styles, children } = this.props
    if (!url && !onClick) {
      return null
    }

    const linkRule = css(rules.link, styles)

    // use anchor tags for absolute urls, otherwise use a router link
    if (!url || /https?:\/\//.test(url)) {
      return <a {...linkRule} href={url} onClick={onClick} target='_blank'>{children}</a>
    } else {
      return <RouterLink {...linkRule} to={url} onClick={onClick}>{children}</RouterLink>
    }
  }
}

const rules = stylesheet({
  link: {
    display: 'inline-block',
    color: colors.primary,
    transition: 'color 0.25s',
    ':hover': {
      color: colors.primaryHighlight
    }
  }
})
