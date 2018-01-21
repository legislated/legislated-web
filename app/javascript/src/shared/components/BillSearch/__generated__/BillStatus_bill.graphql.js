/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type BillStatus_bill = {|
  +id: string;
  +steps: $ReadOnlyArray<?{|
    +actor: "LOWER" | "LOWER_COMMITTEE" | "UPPER" | "UPPER_COMMITTEE" | "GOVERNOR";
    +action: "INTRODUCED" | "RESOLVED";
    +resolution: "PASSED" | "FAILED" | "SIGNED" | "VETOED" | "VETOED_LINE" | "NONE";
    +date: any;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BillStatus_bill",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
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
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "resolution",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "date",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Bill"
};

module.exports = fragment;
