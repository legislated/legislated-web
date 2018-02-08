// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { mixins, colors } from '@/styles'
import type { SearchParamsSubset } from '@/types'

type SubsetEntry = {
  label: string,
  value: SearchParamsSubset,
}

type Props = {
  entry: SubsetEntry,
  value: ?SearchParamsSubset,
  onChange: (event: SyntheticInputEvent) => void
}

export function SearchFiltersSubset ({
  entry,
  value,
  onChange
}: Props) {
  return (
    <Option>
      <input
        type='checkbox'
        name='subset'
        value={entry.value}
        onChange={onChange}
        checked={entry.value === value}
      />
      <span
        children={entry.label}
      />
    </Option>
  )
}

const Option = styled.label`
  ${mixins.flexRow};
  ${mixins.fonts.regularSlab};
  ${mixins.fontSizes.h5};

  align-items: center;
  color: ${colors.gray2};

  > input {
    margin-right: 10px;
  }
`
