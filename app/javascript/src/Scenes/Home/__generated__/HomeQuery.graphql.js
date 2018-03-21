/**
 * @flow
 * @relayHash ce80d24ed0ec857ca328ea04d4842b59
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type HomeQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query HomeQuery(
  $params: BillsSearchParams!
  $count: Int!
  $cursor: String!
) {
  viewer {
    ...BillSearch_viewer
    id
  }
}

fragment BillSearch_viewer on Viewer {
  bills(params: $params, first: $count, after: $cursor) {
    edges {
      node {
        __typename
        id
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  ...BillList_viewer
}

fragment BillList_viewer on Viewer {
  bills(params: $params, first: $count, after: $cursor) {
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
  summary
  hearing {
    date
    id
  }
  ...BillTitle_bill
  ...BillStatus_bill
}

fragment BillTitle_bill on Bill {
  title
  updatedAt
  document {
    number
    id
  }
}

fragment BillStatus_bill on Bill {
  id
  steps {
    actor
    action
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "params",
        "type": "BillsSearchParams!",
        "defaultValue": null
      },
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQuery",
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
            "name": "BillSearch_viewer",
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
  "name": "HomeQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "params",
        "type": "BillsSearchParams!",
        "defaultValue": null
      },
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
      }
    ],
    "kind": "Root",
    "name": "HomeQuery",
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
                "name": "params",
                "variableName": "params",
                "type": "BillsSearchParams"
              }
            ],
            "concreteType": "BillsSearch",
            "name": "bills",
            "plural": false,
            "selections": [
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
                        "name": "summary",
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
                        "name": "updatedAt",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Document",
                        "name": "document",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "number",
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
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Step",
                        "name": "steps",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "actor",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "action",
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "count",
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
                "name": "params",
                "variableName": "params",
                "type": "BillsSearchParams"
              }
            ],
            "handle": "connection",
            "name": "bills",
            "key": "BillSearch_bills",
            "filters": [
              "params"
            ]
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
                "name": "params",
                "variableName": "params",
                "type": "BillsSearchParams"
              }
            ],
            "handle": "connection",
            "name": "bills",
            "key": "BillList_bills",
            "filters": [
              "params"
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
  "text": "query HomeQuery(\n  $params: BillsSearchParams!\n  $count: Int!\n  $cursor: String!\n) {\n  viewer {\n    ...BillSearch_viewer\n    id\n  }\n}\n\nfragment BillSearch_viewer on Viewer {\n  bills(params: $params, first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        id\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...BillList_viewer\n}\n\nfragment BillList_viewer on Viewer {\n  bills(params: $params, first: $count, after: $cursor) {\n    count\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        __typename\n        id\n        ...BillCell_bill\n      }\n      cursor\n    }\n  }\n}\n\nfragment BillCell_bill on Bill {\n  id\n  summary\n  hearing {\n    date\n    id\n  }\n  ...BillTitle_bill\n  ...BillStatus_bill\n}\n\nfragment BillTitle_bill on Bill {\n  title\n  updatedAt\n  document {\n    number\n    id\n  }\n}\n\nfragment BillStatus_bill on Bill {\n  id\n  steps {\n    actor\n    action\n  }\n}\n"
};

module.exports = batch;
