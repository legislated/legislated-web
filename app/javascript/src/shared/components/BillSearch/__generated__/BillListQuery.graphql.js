/**
 * @flow
 * @relayHash 8a59ecd2b8ab88999021f9506a6f755c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type BillListQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query BillListQuery(
  $count: Int!
  $cursor: String!
  $query: String!
  $startDate: Time!
  $endDate: Time!
) {
  viewer {
    ...BillList_viewer
    id
  }
}

fragment BillList_viewer on Viewer {
  bills(first: $count, after: $cursor, query: $query, from: $startDate, to: $endDate) {
    count
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        __typename
        id
        ...BillCell_bill
      }
      cursor
    }
  }
}

fragment BillCell_bill on Bill {
  id
  documentNumber
  title
  summary
  witnessSlipUrl
  detailsUrl
  fullTextUrl
  hearing {
    date
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "query",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "startDate",
        "type": "Time!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endDate",
        "type": "Time!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BillListQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "BillList_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "BillListQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "count",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "cursor",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "query",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "startDate",
        "type": "Time!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "endDate",
        "type": "Time!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "BillListQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "after",
                "variableName": "cursor",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "count",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "from",
                "variableName": "startDate",
                "type": "Time"
              },
              {
                "kind": "Variable",
                "name": "query",
                "variableName": "query",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "to",
                "variableName": "endDate",
                "type": "Time"
              }
            ],
            "concreteType": "BillSearchConnection",
            "name": "bills",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "count",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "BillEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Bill",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "documentNumber",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "summary",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "witnessSlipUrl",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "detailsUrl",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "fullTextUrl",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Hearing",
                        "name": "hearing",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "id",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "after",
                "variableName": "cursor",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "count",
                "type": "Int"
              },
              {
                "kind": "Variable",
                "name": "from",
                "variableName": "startDate",
                "type": "Time"
              },
              {
                "kind": "Variable",
                "name": "query",
                "variableName": "query",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "to",
                "variableName": "endDate",
                "type": "Time"
              }
            ],
            "handle": "connection",
            "name": "bills",
            "key": "BillList_bills",
            "filters": [
              "query",
              "from",
              "to"
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query BillListQuery(\n  $count: Int!\n  $cursor: String!\n  $query: String!\n  $startDate: Time!\n  $endDate: Time!\n) {\n  viewer {\n    ...BillList_viewer\n    id\n  }\n}\n\nfragment BillList_viewer on Viewer {\n  bills(first: $count, after: $cursor, query: $query, from: $startDate, to: $endDate) {\n    count\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __typename\n        id\n        ...BillCell_bill\n      }\n      cursor\n    }\n  }\n}\n\nfragment BillCell_bill on Bill {\n  id\n  documentNumber\n  title\n  summary\n  witnessSlipUrl\n  detailsUrl\n  fullTextUrl\n  hearing {\n    date\n    id\n  }\n}\n"
};

module.exports = batch;
