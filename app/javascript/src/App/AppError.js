// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { mixins } from '@/styles'

type Props = {
  children?: React.Node
}

type State = {
  error: ?Error
}

export class AppError extends React.Component<*, Props, State> {
  state = {
    error: null
  }

  // lifecycle
  componentDidCatch (error: Error) {
    this.setState({ error })
  }

  render () {
    const { children } = this.props
    const { error } = this.state

    if (error == null) {
      return children
    }

    return (
      <Container>
        <h1>Oops, something went wrong.</h1>
        <h4>{error.toString()}</h4>
      </Container>
    )
  }
}

const Container = styled.section`
  ${mixins.flexColumn};

  justify-content: center;
  min-height: 100vh;
  padding: 40px;

  > h1 {
    margin-bottom: 20px;
  }
`
