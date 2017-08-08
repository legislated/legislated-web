module Types
  LegislatorType = GraphQL::ObjectType.define do
    name 'Legislator'
    description 'A legislator'
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, 'The graph id'
    field :externalId, !types.Int, 'The external id', property: :external_id
    field :documentNumber, !types.String, 'The number of the document, e.g. HB 1234', property: :document_number
    field :title, types.String, "The document's title"
    field :summary, types.String, "The document's official synopsis"
    field :humanSummary, types.String, "The document's human-readable summary", property: :human_summary
    field :sponsorName, !types.String, 'The name of the sponsoring legislator', property: :sponsor_name
    field :detailsUrl, types.String, 'The URL of the detail page', property: :details_url
    field :fullTextUrl, types.String, 'The URL of the full text page', property: :full_text_url

    # relationships
    field :hearing, !HearingType, 'The parent hearing'

    field :committee, !CommitteeType, 'The parent committee' do
      resolve -> (bill, _args, _ctx) { bill.hearing.committee }
    end

    field :chamber, !ChamberType, 'The parent chamber' do
      resolve -> (bill, _args, _ctx) { bill.hearing.committee.chamber }
    end
  end
end
