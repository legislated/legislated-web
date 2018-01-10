module Types
  BillType = GraphQL::ObjectType.define do
    name 'Bill'
    description 'A bill'
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, 'The graph id'
    field :externalId, !types.Int, 'The external id', property: :external_id
    field :title, types.String, 'The title'
    field :summary, types.String, 'The official synopsis'
    field :humanSummary, types.String, 'The human-readable summary', property: :human_summary
    field :sponsorName, !types.String, 'The name of the sponsoring legislator', property: :sponsor_name
    field :detailsUrl, types.String, 'The URL of the detail page', property: :details_url
    field :steps, !types[StepType], 'The procedural steps a bill can take'
    field :updatedAt, !DateTimeType, 'The updated date'

    # relationships
    field :hearing, !HearingType, 'The parent hearing'

    field :documents, !DocumentType.to_list_type, "The versions of the bill's document"

    field :committee, !CommitteeType, 'The parent committee' do
      resolve -> (bill, _args, _ctx) { bill.hearing.committee }
    end

    field :chamber, !ChamberType, 'The parent chamber' do
      resolve -> (bill, _args, _ctx) { bill.hearing.committee.chamber }
    end

    # deprecated
    field :documentNumber, !types.String, 'The number of the document, e.g. HB 1234' do
      deprecation_reason 'moved to DocumentType'
      resolve -> (bill, _args, _ctx) { bill.document&.number }
    end

    field :fullTextUrl, types.String, 'The URL of the full text page' do
      deprecation_reason 'moved to DocumentType'
      resolve -> (bill, _args, _ctx) { bill.document&.full_text_url }
    end

    field :witnessSlipUrl, types.String, 'The URL of the witness slip form' do
      deprecation_reason 'moved to DocumentType'
      resolve -> (bill, _args, _ctx) { bill.document&.slip_url }
    end

    field :witnessSlipResultUrl, types.String, 'The URL of the witness slip result' do
      deprecation_reason 'moved to DocumentType'
      resolve -> (bill, _args, _ctx) { bill.document&.slip_results_url }
    end
  end
end
