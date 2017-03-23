module Types
  BillType = GraphQL::ObjectType.define do
    name "Bill"
    description "A bill"
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, "The graph id"
    field :externalId, !types.Int, "The external id", property: :external_id
    field :documentNumber, !types.String, "The number of the document, e.g. HB 1234", property: :document_number
    field :title, types.String, "The document's title"
    field :summary, types.String, "The document's synopsis"
    field :sponsorName, !types.String, "The name of the sponsoring legislator", property: :sponsor_name
    field :witnessSlipUrl, types.String, "The URL of the witness slip form", property: :witness_slip_url

    # relationships
    field :hearing, !HearingType, "The parent hearing"
  end
end
