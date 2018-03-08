describe Types::BillType, :graph_type do
  subject { described_class }

  let(:model) { build(:bill, :with_documents) }

  it_maps_fields({
    ilga_id: 'ilgaId',
    human_summary: 'humanSummary',
    sponsor_name: 'sponsorName',
    details_url: 'detailsUrl'
  })
end
