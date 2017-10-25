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
export type Chamber = {
  name: string,
}

export type Committee = {
  name: string,
}

export type Hearing = {
  id: string,
  date: string,
}

export type Bill = {
  id: string,
  documentNumber: string,
  title: string,
  summary: string,
  detailsUrl: string,
  fullTextUrl: string,
  witnessSlipUrl: string,
  witnessSlipResultUrl: string,
  hearing: Hearing,
  committee: Committee,
  chamber: Chamber
}

export type Viewer = {
  isAdmin: boolean,
  bill: Bill,
  bills: SearchConnection<Bill>
}
