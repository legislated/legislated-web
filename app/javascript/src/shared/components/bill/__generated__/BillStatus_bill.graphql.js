/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
export type StepAction = ('INTRODUCED' | 'RESOLVED' | '%future added value');
export type StepActor = ('GOVERNOR' | 'LOWER' | 'LOWER_COMMITTEE' | 'UPPER' | 'UPPER_COMMITTEE' | '%future added value');
import type { FragmentReference } from 'relay-runtime';
declare export opaque type BillStatus_bill$ref: FragmentReference;
export type BillStatus_bill = {|
  +id: string,
  +steps: $ReadOnlyArray<?{|
    +actor: StepActor,
    +action: StepAction,
  |}>,
  +$refType: BillStatus_bill$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "BillStatus_bill",
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
};
(node/*: any*/).hash = '98f091bc5c9dcacd664f852edab04bf0';
module.exports = node;
