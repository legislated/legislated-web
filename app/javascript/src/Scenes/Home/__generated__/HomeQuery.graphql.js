/**
 * @flow
 * @relayHash 155c46c6db0222687bd2b9abc8f7418b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type BillSearch_viewer$ref = any;
export type BillsSearchParamsSubset = ('GOVERNOR' | 'LOWER' | 'SLIPS' | 'UPPER' | '%future added value');
export type HomeQueryVariables = {|
  params: {
    key?: ?string,
    query?: ?string,
    subset?: ?BillsSearchParamsSubset,
  },
  count: number,
  cursor: string,
|};
export type HomeQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: BillSearch_viewer$ref,
  |},
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
        id
        __typename
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
        id
        ...BillCell_bill
        __typename
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
  number
}

fragment BillStatus_bill on Bill {
  id
  steps {
    actor
    action
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  "params"
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "HomeQuery",
  "id": null,
  "text": "query HomeQuery(\n  $params: BillsSearchParams!\n  $count: Int!\n  $cursor: String!\n) {\n  viewer {\n    ...BillSearch_viewer\n    id\n  }\n}\n\nfragment BillSearch_viewer on Viewer {\n  bills(params: $params, first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...BillList_viewer\n}\n\nfragment BillList_viewer on Viewer {\n  bills(params: $params, first: $count, after: $cursor) {\n    count\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        id\n        ...BillCell_bill\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment BillCell_bill on Bill {\n  id\n  summary\n  hearing {\n    date\n    id\n  }\n  ...BillTitle_bill\n  ...BillStatus_bill\n}\n\nfragment BillTitle_bill on Bill {\n  title\n  updatedAt\n  number\n}\n\nfragment BillStatus_bill on Bill {\n  id\n  steps {\n    actor\n    action\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "HomeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "BillSearch_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "HomeQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "bills",
            "storageKey": null,
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
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "BillEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Bill",
                    "plural": false,
                    "selections": [
                      v1,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "summary",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "hearing",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Hearing",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "date",
                            "args": null,
                            "storageKey": null
                          },
                          v1
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "title",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "updatedAt",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "number",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "steps",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Step",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "actor",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "action",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "count",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "bills",
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
            "key": "BillSearch_bills",
            "filters": v2
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "bills",
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
            "key": "BillList_bills",
            "filters": v2
          },
          v1
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'ad4e550bef134560027d94a99097a368';
module.exports = node;
