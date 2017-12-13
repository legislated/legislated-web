// @flow
import React, { Component } from 'react'
import { NavLink } from './NavLink'
import { css } from 'glamor'
import type { Rule } from 'glamor'
import { stylesheet, mixins } from 'shared/styles'

export class NavLinkList extends Component {
  props: {
    showsIcons?: boolean,
    styles?: Rule,
    onClick?: Function
  }

  static defaultProps = {
    showsIcons: false
  }

  // lifecycle
  render () {
    const { showsIcons, styles, onClick } = this.props

    const linkProps = {
      styles: rules.link,
      onClick
    }

    return <div {...css(rules.links, styles)}>
      <NavLink
        {...linkProps}
        to='/'
        iconName='home'
        label='Home' />
      <div {...rules.secondaryLinks}>
        <NavLink
          {...linkProps}
          to='/faq'
          iconName={showsIcons ? 'question' : null}
          label='FAQ' />
        <NavLink
          {...linkProps}
          to='/about'
          iconName={showsIcons ? 'heart' : null}
          label='About Us' />
      </div>
    </div>
  }
}

const rules = stylesheet({
  links: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    ...mixins.mobile({
      flexDirection: 'column',
      justifyContent: 'flex-start'
    })
  },
  secondaryLinks: {
    display: 'flex',
    ...mixins.mobile({
      flexDirection: 'column'
    })
  },
  link: {
    marginRight: 10,
    fontSize: 20,
    ...mixins.mobile({
      marginRight: 0
    })
  }
})
