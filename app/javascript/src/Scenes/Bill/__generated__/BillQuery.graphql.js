/**
 * @flow
 * @relayHash 89cc5fabd05eda16ab9e9eacc1dd9398
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type BillQueryResponse = {|
  +viewer: ?{|
    +bill: ?{| |};
  |};
|};
*/


/*
query BillQuery(
  $id: ID!
) {
  viewer {
    bill(id: $id) {
      ...BillDetail_bill
      id
    }
    id
  }
}

fragment BillDetail_bill on Bill {
  summary
  sponsorName
  detailsUrl
  fullTextUrl
  witnessSlipUrl
  witnessSlipResultUrl
  committee {
    name
    id
  }
  ...BillTitle_bill
  ...BillStatus_bill
}

fragment BillTitle_bill on Bill {
  title
  documentNumber
  updatedAt
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
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BillQuery",
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
                "name": "id",
                "variableName": "id",
                "type": "ID!"
              }
            ],
            "concreteType": "Bill",
            "name": "bill",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "BillDetail_bill",
                "args": null
              }
            ],
            "storageKey": null
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
  "name": "BillQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "BillQuery",
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
                "name": "id",
                "variableName": "id",
                "type": "ID!"
              }
            ],
            "concreteType": "Bill",
            "name": "bill",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "summary",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "sponsorName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "detailsUrl",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "fullTextUrl",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "witnessSlipUrl",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "witnessSlipResultUrl",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Committee",
                "name": "committee",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
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
                "name": "documentNumber",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query BillQuery(\n  $id: ID!\n) {\n  viewer {\n    bill(id: $id) {\n      ...BillDetail_bill\n      id\n    }\n    id\n  }\n}\n\nfragment BillDetail_bill on Bill {\n  summary\n  sponsorName\n  detailsUrl\n  fullTextUrl\n  witnessSlipUrl\n  witnessSlipResultUrl\n  committee {\n    name\n    id\n  }\n  ...BillTitle_bill\n  ...BillStatus_bill\n}\n\nfragment BillTitle_bill on Bill {\n  title\n  documentNumber\n  updatedAt\n}\n\nfragment BillStatus_bill on Bill {\n  id\n  steps {\n    actor\n    action\n  }\n}\n"
};

module.exports = batch;
