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
declare export opaque type BillCell_bill$ref: FragmentReference;
export type BillCell_bill = {|
  +id: string,
  +summary: ?string,
  +hearing: ?{|
    +date: any,
  |},
  +$fragmentRefs: (BillTitle_bill$ref & BillStatus_bill$ref),
  +$refType: BillCell_bill$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "BillCell_bill",
  "type": "Bill",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
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
(node/*: any*/).hash = 'ece2f826bb8559de829569f36644ee48';
module.exports = node;
