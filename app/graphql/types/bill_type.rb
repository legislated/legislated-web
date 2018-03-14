module Types
  BillType = GraphQL::ObjectType.define do
    name 'Bill'
    description 'A bill'

    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, 'The graph id'
    field :number, !types.String, 'The bill number'
    field :title, types.String, 'The title'
    field :summary, types.String, 'The official synopsis'
    field :humanSummary, types.String, 'The human-readable summary', property: :human_summary
    field :sponsorName, types.String, 'The name of the sponsoring legislator', property: :sponsor_name
    field :detailsUrl, types.String, 'The URL of the detail page', property: :details_url
    field :slipUrl, types.String, 'The URL of the witness slip form', property: :slip_url
    field :slipResultsUrl, types.String, 'The URL of the witness slip submission history', property: :slip_results_url
    field :steps, !types[StepType], 'The procedural steps a bill can take'
    field :updatedAt, !DateTimeType, 'The updated date', property: :updated_at

    # relationships
    field :hearing, HearingType, 'The parent hearing'
    field :document, DocumentType, 'The most recent version of the bill'
    field :documents, !DocumentType.to_list_type, "The versions of the bill's document"
  end
end
