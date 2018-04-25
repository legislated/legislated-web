/**
 * @flow
 * @relayHash a27ddb1ce24ea790e5ff2b46e24313b9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type BillDetail_bill$ref = any;
export type BillQueryVariables = {|
  id: string,
|};
export type BillQueryResponse = {|
  +viewer: ?{|
    +bill: ?{|
      +$fragmentRefs: BillDetail_bill$ref,
    |},
  |},
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
  detailsUrl
  sponsorName
  slipUrl
  slipResultsUrl
  document {
    fullTextUrl
    id
  }
  hearing {
    committee {
      name
      id
    }
    id
  }
  ...BillHead_bill
  ...BillTitle_bill
  ...BillStatus_bill
}

fragment BillHead_bill on Bill {
  title
  summary
  number
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
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "BillQuery",
  "id": null,
  "text": "query BillQuery(\n  $id: ID!\n) {\n  viewer {\n    bill(id: $id) {\n      ...BillDetail_bill\n      id\n    }\n    id\n  }\n}\n\nfragment BillDetail_bill on Bill {\n  summary\n  detailsUrl\n  sponsorName\n  slipUrl\n  slipResultsUrl\n  document {\n    fullTextUrl\n    id\n  }\n  hearing {\n    committee {\n      name\n      id\n    }\n    id\n  }\n  ...BillHead_bill\n  ...BillTitle_bill\n  ...BillStatus_bill\n}\n\nfragment BillHead_bill on Bill {\n  title\n  summary\n  number\n}\n\nfragment BillTitle_bill on Bill {\n  title\n  updatedAt\n  number\n}\n\nfragment BillStatus_bill on Bill {\n  id\n  steps {\n    actor\n    action\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "BillQuery",
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
            "kind": "LinkedField",
            "alias": null,
            "name": "bill",
            "storageKey": null,
            "args": v1,
            "concreteType": "Bill",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "BillDetail_bill",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "BillQuery",
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
            "name": "bill",
            "storageKey": null,
            "args": v1,
            "concreteType": "Bill",
            "plural": false,
            "selections": [
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
                      },
                      v2
                    ]
                  },
                  v2
                ]
              },
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
                  },
                  v2
                ]
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
                "name": "title",
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
                "kind": "ScalarField",
                "alias": null,
                "name": "updatedAt",
                "args": null,
                "storageKey": null
              },
              v2,
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
          v2
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '81534aa343525c10ca57b44d2bd7a0e5';
module.exports = node;
