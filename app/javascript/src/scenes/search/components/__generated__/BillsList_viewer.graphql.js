/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type BillsList_viewer = {|
  +bills: ?{|
    +count: number;
    +pageInfo: {|
      +hasNextPage: boolean;
      +endCursor: ?string;
    |};
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string;
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "cursor",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "query",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "startDate",
      "type": "Time"
    },
    {
      "kind": "RootArgument",
      "name": "endDate",
      "type": "Time"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "bills"
        ]
      }
    ]
  },
  "name": "BillsList_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "bills",
      "args": [
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
      "name": "__BillsList_bills_connection",
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
                  "name": "id",
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "BillCell_bill",
                  "args": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
