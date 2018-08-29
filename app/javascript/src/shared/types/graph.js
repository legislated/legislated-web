// @flow
// connection types
export type Edge<T> = {
  node: T,
  cursor: string
}

export type PageInfo = {
  hasNextPage: boolean
}

export type Connection<T> = {
  edges: Array<Edge<T>>,
  pageInfo: PageInfo
}

export type SearchConnection<T> = {
  count: number
} & Connection<T>

// data types
export type Chamber
  = 'LOWER'
  | 'UPPER'

export type Committee = {
  name: string,
  chamber: Chamber
}

export type Hearing = {
  id: string,
  date: string,
  committee: Committee
}

export type StepActor
  = 'LOWER'
  | 'LOWER_COMMITTEE'
  | 'UPPER'
  | 'UPPER_COMMITTEE'
  | 'GOVERNOR'

export type StepAction
  = 'INTRODUCED'
  | 'RESOLVED'

export type StepResolution
  = 'PASSED'
  | 'FAILED'
  | 'SIGNED'
  | 'VETOED'
  | 'VETOED_LINE'
  | 'NONE'

export type Step = {
  actor: StepActor,
  action: StepAction,
  resolution: StepResolution,
  date: string
}

export type Document = {
  id: string,
  number: string,
  fullTextUrl: string,
  slipUrl: string,
  slipResultsUrl: string
}

export type Bill = {
  id: string,
  documentNumber: string,
  title: string,
  summary: string,
  sponsorName: string,
  detailsUrl: string,
  witnessSlipUrl: string,
  witnessSlipResultUrl: string,
  steps: Array<Step>,
  hearing: ?Hearing,
  document: Document,
  updatedAt: string
}

export type SearchParamsSubset
  = 'SLIPS'
  | 'LOWER'
  | 'UPPER'
  | 'GOVERNOR'
  | 'SIGNED'
  | 'VETOED'

export type SearchParams = {
  query?: string,
  subset?: SearchParamsSubset
}

export type Viewer = {
  isAdmin: boolean,
  bill: Bill,
  bills: SearchConnection<Bill>
}
