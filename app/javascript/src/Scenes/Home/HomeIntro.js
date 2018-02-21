// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link, CloseButton as CloseButton$, Defer } from '@/components'
import { local } from '@/storage'
import { mixins } from '@/styles'

type State = {
  isAccepted: boolean
}

export class HomeIntro extends React.Component<{}, State> {
  state = {
    isAccepted: !!local.get('intro-cleared')
  }

  // events
  didClickAccept = () => {
    this.setState({ isAccepted: true }, () => {
      local.set('intro-cleared', 'true')
    })
  }

  // lifecycle
  componentDidMount () {
    local.set('intro-visited', 'true')
  }

  render () {
    const { isAccepted } = this.state

    return (
      <Defer>
        {!isAccepted && (
          <Intro2>
            <h2>It's time the government went digital.</h2>
            <h4>You should be heard by your representatives, and you should know how they represent you.</h4>
            <h4><Link to='#'>See the bills</Link> that impact your life and get in touch with your congress people today.</h4>
            <CloseButton
              onClick={this.didClickAccept}
            />
          </Intro2>
        )}
      </Defer>
    )
  }
}

const Intro2 = styled.div`
  ${mixins.pageContent};

  align-self: center;
  padding-top: 70px;
  padding-bottom: 70px;

  > h2 {
    margin-bottom: 25px;
  }

  > h4 + h4 {
    margin-top: 15px;
  }
`

const CloseButton = styled(CloseButton$)`
  position: absolute;
  top: 30px;
  right: 30px;
`
