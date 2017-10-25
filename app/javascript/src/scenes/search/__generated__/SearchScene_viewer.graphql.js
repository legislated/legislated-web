/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type SearchScene_viewer = {|
  +bills: ?{|
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
  "metadata": null,
  "name": "SearchScene_viewer",
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
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "BillsList_viewer",
      "args": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
