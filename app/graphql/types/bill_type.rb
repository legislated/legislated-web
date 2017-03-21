module Types
  BillType = GraphQL::ObjectType.define do
    name "Bill"
    description "A bill"
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, "The graph id"
    field :externalId, !types.Int, "The external id", property: :external_id
    field :sponsorName, !types.String, "The name of the sponsoring legislator", property: :sponsor_name
    field :documentName, !types.String, "The name of the document", property: :document_name
    field :description, types.String, "The document's title"
    field :synopsis, types.String, "The document's abstract"
    field :witnessSlipUrl, types.String, "The URL of the witness slip form", property: :witness_slip_url
  end
end
