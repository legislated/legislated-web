// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from '../Link'
import { colors, mixins } from '@/styles'
import type { SearchParams } from '@/types'

type Props = {
  params: SearchParams,
  onChange: (SearchParams) => void
}

type State = {
  isFocused: boolean
}

export class SearchField extends React.Component<Props, State> {
  state = {
    isFocused: false
  }

  // events
  didChangeQuery = ({ target }: SyntheticInputEvent<*>) => {
    const { params, onChange } = this.props

    onChange({
      ...params,
      query: target.value
    })
  }

  didChangeFocus = (isFocused: boolean) => () => {
    this.setState({ isFocused })
  }

  // lifecycle
  render () {
    const { params } = this.props
    const { isFocused } = this.state

    return (
      <Search>
        <FieldContainer>
          <Field isFocused={isFocused}>
            <Input
              type='text'
              name='search-field'
              value={params.query}
              placeholder={`health care, HB2364`}
              onChange={this.didChangeQuery}
              onFocus={this.didChangeFocus(true)}
              onBlur={this.didChangeFocus(false)}
            />
            <Button
              onClick={() => {}}
              children='Search'
            />
          </Field>
        </FieldContainer>
      </Search>
    )
  }
}

const Search = styled.div`
  ${mixins.flexRow};

  justify-content: center;
  align-items: center;
  height: 150px;
  background-color: ${colors.primary};

  ${mixins.mobile`
    height: 120px;
  `}
`

const FieldContainer = styled.div`
  ${mixins.flexRow};
  ${mixins.pageWidth};

  flex: 1;
  height: 56px;
  padding: 0 70px;

  ${mixins.mobile`
    padding: 0 30px;
  `}
`

const focused = css`
  border-width: 2px;
  transform: perspective(200px) translateZ(1px);
`

const Field = styled.div`
  ${mixins.flexRow};
  ${mixins.font.sizes.h5};

  flex: 1;
  border: solid ${colors.white};
  border-width: 1px;
  border-radius: 10px;
  overflow: hidden;
  transform: perspective(200px) translateZ(0px);
  color: ${colors.white};
  transition: border-width 0.15s, transform 0.15s;

  ${({ isFocused }) => isFocused && focused}
`

const Input = styled.input`
  flex: 1;
  padding: 0 25px;

  &:focus {
    cursor: text;
  }

  ::placeholder {
    color: ${colors.white};
    opacity: 0.5;
  }

  ${mixins.mobile`
    padding: 0 15px;
  `}
`

const Button = styled(Link)`
  ${mixins.flexRow};
  ${mixins.flexCenter};
  ${mixins.font.bold};

  width: 215px;
  color: ${colors.primary};
  background-color: ${colors.white};
  text-transform: uppercase;

  ${mixins.mobile`
    width: 90px;
  `}
`
