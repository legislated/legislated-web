/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type BillStatus_bill$ref = any;
type BillTitle_bill$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type BillDetail_bill$ref: FragmentReference;
export type BillDetail_bill = {|
  +summary: ?string,
  +detailsUrl: ?string,
  +sponsorName: ?string,
  +slipUrl: ?string,
  +slipResultsUrl: ?string,
  +document: ?{|
    +fullTextUrl: ?string,
  |},
  +hearing: ?{|
    +committee: {|
      +name: string,
    |},
  |},
  +$fragmentRefs: (BillTitle_bill$ref & BillStatus_bill$ref),
  +$refType: BillDetail_bill$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "BillDetail_bill",
  "type": "Bill",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "summary",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "detailsUrl",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "sponsorName",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slipUrl",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slipResultsUrl",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "document",
      "storageKey": null,
      "args": null,
      "concreteType": "Document",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "fullTextUrl",
          "args": null,
          "storageKey": null
        }
      ]
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
          "kind": "LinkedField",
          "alias": null,
          "name": "committee",
          "storageKey": null,
          "args": null,
          "concreteType": "Committee",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "BillTitle_bill",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "BillStatus_bill",
      "args": null
    }
  ]
};
(node/*: any*/).hash = '1a836a519e792e8d8d5620dd7249bb6b';
module.exports = node;
