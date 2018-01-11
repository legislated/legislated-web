/**
 * @flow
 * @relayHash 703a04db8ecb1ace280872b1f4f4df60
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type adminBillsRouteQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query adminBillsRouteQuery {
  viewer {
    ...AdminBillsScene_viewer
    id
  }
}

fragment AdminBillsScene_viewer on Viewer {
  isAdmin
  bills(first: 1) {
    edges {
      node {
        id
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "adminBillsRouteQuery",
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
            "name": "AdminBillsScene_viewer",
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
  "name": "adminBillsRouteQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "adminBillsRouteQuery",
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
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "isAdmin",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1,
                "type": "Int"
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
                        "name": "id",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "bills{\"first\":1}"
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
  "text": "query adminBillsRouteQuery {\n  viewer {\n    ...AdminBillsScene_viewer\n    id\n  }\n}\n\nfragment AdminBillsScene_viewer on Viewer {\n  isAdmin\n  bills(first: 1) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
