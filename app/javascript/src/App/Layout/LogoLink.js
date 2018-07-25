// @flow
import { Link } from 'react-router-dom'
import styled from 'react-emotion'
import { colors } from '@/styles'

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${colors.black};
  text-decoration: none;

  &:hover {
    color: ${colors.primary};
  }

  > img {
    margin-right: 15px;
  }
`
