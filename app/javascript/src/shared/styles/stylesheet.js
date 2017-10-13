// @flow
import { reduce, defaults } from 'lodash'
import { css } from 'glamor'
import type { RuleDefinition, RuleProp } from 'glamor'

type RuleDefinitionMap<K> = { [key: K]: RuleDefinition }
type RulePropMap<K> = { [key: K]: RuleProp }

export function stylesheet<K> (definitions: RuleDefinitionMap<K>): RulePropMap<K> {
  return reduce(definitions, (memo, definition, key) => {
    const def = defaults(definition, { label: key })
    memo[key] = css(def)
    return memo
  }, {})
}
