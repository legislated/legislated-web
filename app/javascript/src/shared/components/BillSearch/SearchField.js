// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from '../Link'
import { colors, mixins } from 'shared/styles'

type Props = {
  value: string,
  onChange: (string) => void
}

type State = {
  isFocused: boolean
}

export class SearchField extends React.Component<*, Props, State> {
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
    const { value } = this.props
    const { isFocused } = this.state

    return (
      <Container>
        <Field isFocused={isFocused}>
          <Input
            type='text'
            name='search-field'
            value={value}
            placeholder={`health care, HB2364`}
            onChange={this.inputDidChange}
            onFocus={() => this.inputDidChangeFocus(true)}
            onBlur={() => this.inputDidChangeFocus(false)}
          />
          <Button
            onClick={() => {}}
            children='Search'
          />
        </Field>
      </Container>
    )
  }
}

const Container = styled.div`
  ${mixins.flexRow};

  justify-content: center;
  align-items: center;
  height: 190px;
  background-color: ${colors.primary};
`

const Field = styled.div`
  ${mixins.flexRow};
  ${mixins.pageWidth};
  ${mixins.pageMargin};

  flex: 1;
  height: 70px;
  border: solid ${colors.white};
  border-width: ${({ isFocused }: State) => isFocused ? 2 : 1}px;
  border-radius: 10px;
  overflow: hidden;
  transform: perspective(200px) translateZ(${({ isFocused }: State) => isFocused ? 1 : 0}px);
  font-size: 24px;
  color: ${colors.white};
  transition: border-width 0.15s, transform 0.15s;
`

const Input = styled.input`
  flex: 1;
  padding: 0 30px;
  color: inherit;
  background-color: transparent;
  font-size: inherit;

  ::placeholder {
    color: ${colors.white};
    opacity: 0.5;
  }
`

const Button = styled(Link)`
  ${mixins.flexRow};
  ${mixins.flexCenter};
  ${mixins.fonts.bold};

  width: 215px;
  color: ${colors.primary};
  background-color: ${colors.white};
  text-transform: uppercase;
`
