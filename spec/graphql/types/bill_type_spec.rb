describe Types::BillType, :graph_type do
  subject { described_class }

  let(:model) { build(:bill, :with_documents) }

  it_maps_fields({
    details_url: 'detailsUrl',
    slip_url: 'slipUrl',
    slip_results_url: 'slipResultsUrl',
    sponsor_name: 'sponsorName',
    human_summary: 'humanSummary'
  })
end
