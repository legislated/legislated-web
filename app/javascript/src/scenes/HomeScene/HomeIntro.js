// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link, CloseButton as CloseButton$, Defer } from 'shared/components'
import { local } from 'shared/storage'
import { mixins } from 'shared/styles'

type Props = {
  className?: string
}

type State = {
  isAccepted: boolean
}

export class HomeIntro extends React.Component<*, Props, State> {
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
    const { className } = this.props
    const { isAccepted } = this.state

    return (
      <Defer>
        {!isAccepted && (
          <Container className={className}>
            <h2>It's time the government went digital.</h2>
            <h4>You should be heard by your representatives, and you should know how they represent you.</h4>
            <h4><Link to='#'>See the bills</Link> that impact your life and get in touch with your congress people today.</h4>
            <CloseButton
              onClick={this.didClickAccept}
            />
          </Container>
        )}
      </Defer>
    )
  }
}

const Container = styled.div`
  ${mixins.pageWidth};
  ${mixins.pageMargin};

  align-self: center;
  padding: 90px 0;

  > h2 {
    margin-bottom: 30px;
  }

  > h4 + h4 {
    margin-top: 20px;
  }
`

const CloseButton = styled(CloseButton$)`
  position: absolute;
  top: 40px;
  right: 40px;
`
