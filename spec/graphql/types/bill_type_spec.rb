describe Types::BillType, graphql: :type do
  subject { described_class }

  let(:model) { build(:bill, :with_any_hearing, :with_documents) }
  let(:hearing) { model.hearing }
  let(:document) { model.documents.first }

  it_maps_fields({
    external_id: 'externalId',
    human_summary: 'humanSummary',
    sponsor_name: 'sponsorName',
    details_url: 'detailsUrl'
  })

  it 'exposes the committee' do
    committee = resolve_field(:committee, obj: model)
    expect(committee).to eq(model.hearing.committee)
  end

  it 'exposes the chamber' do
    chamber = resolve_field(:chamber, obj: model)
    expect(chamber).to eq(hearing.committee.chamber)
  end

  it 'deprecates the document number' do
    document_number = resolve_field(:documentNumber, obj: model)
    expect(document_number).to eq(document&.number)
  end

  it 'deprecates the full text url' do
    full_text_url = resolve_field(:fullTextUrl, obj: model)
    expect(full_text_url).to eq(document&.full_text_url)
  end

  it 'deprecates the slip url' do
    witness_slip_url = resolve_field(:witnessSlipUrl, obj: model)
    expect(witness_slip_url).to eq(document&.slip_url)
  end

  it 'deprecates the slip results url' do
    witness_slip_result_url = resolve_field(:witnessSlipResultUrl, obj: model)
    expect(witness_slip_result_url).to eq(document&.slip_results_url)
  end
end
