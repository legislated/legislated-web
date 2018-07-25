/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type BillTitle_bill$ref: FragmentReference;
export type BillTitle_bill = {|
  +title: ?string,
  +updatedAt: any,
  +number: string,
  +$refType: BillTitle_bill$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "BillTitle_bill",
  "type": "Bill",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
    }
  ]
};
(node/*: any*/).hash = '101586a0cb3a5a0fe4efa81bd621dd7c';
module.exports = node;
