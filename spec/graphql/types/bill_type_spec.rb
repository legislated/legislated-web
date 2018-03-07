describe Types::BillType, :graph_type do
  subject { described_class }

  let(:model) { build(:bill, :with_documents) }

  it_maps_fields({
    external_id: 'externalId',
    human_summary: 'humanSummary',
    sponsor_name: 'sponsorName',
    details_url: 'detailsUrl'
  })
end
