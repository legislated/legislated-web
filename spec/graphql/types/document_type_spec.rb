describe Types::DocumentType, :graph_type do
  subject { described_class }

  let(:model) { build(:document, :with_bill) }

  it_maps_fields({
    full_text_url: 'fullTextUrl',
    is_amendment: 'isAmendment'
  })
end
