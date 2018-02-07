// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { SearchFiltersSubset } from './SearchFiltersSubset'
import { mixins, colors } from '@/styles'
import type { SearchParams, SearchParamsSubset } from '@/types'

type Props = {
  params: SearchParams,
  onChange: (SearchParams) => void
}

const SUBSET_ENTRIES = [{
  label: 'slips',
  value: 'SLIPS'
}, {
  label: 'house',
  value: 'LOWER',
}, {
  label: 'senate',
  value: 'UPPER'
}, {
  label: 'governor',
  value: 'GOVERNOR'
}]

export class SearchFilters extends React.Component<*, Props, *> {
  // events
  didChangeFilter = ({ target }: SyntheticInputEvent) => {
    const { params, onChange } = this.props

    onChange({
      ...params,
      [target.name]: target.checked ? target.value : null
    })
  }

  // lifecycle
  render () {
    const { params } = this.props

    return (
      <Filters>
        <Subsets>
          {SUBSET_ENTRIES.map((entry, i) => (
            <SearchFiltersSubset
              key={`filters-subset-${i}`}
              entry={entry}
              value={params.subset}
              onChange={this.didChangeFilter}
            />
          ))}
        </Subsets>
      </Filters>
    )
  }
}

const Filters = styled.div`
  ${mixins.flexRow};
  ${mixins.flexCenter};

  height: 120px;
  border-bottom: 1px solid ${colors.gray5};
`

const Subsets = styled.div`
  ${mixins.flexRow};
  align-items: center;

  > * + * {
    margin-left: 40px;
  }
`
