describe Types::DocumentType, :graph_type do
  subject { described_class }

  let(:model) { build(:document, :with_bill) }

  it_maps_fields({
    full_text_url: 'fullTextUrl',
    slip_url: 'slipUrl',
    slip_results_url: 'slipResultsUrl',
    is_amendment: 'isAmendment'
  })
end
